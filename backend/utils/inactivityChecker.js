const cron = require("node-cron");
const Leads = require("../models/Leads");
const checkUrgency = require("./checkUrgency");
const { sendEmailToUser, sendEmailToOwner } = require("./sendLead");

cron.schedule("* * * * *", async () => {
  try {
    const threeMinutesAgo = new Date(Date.now() - 1 * 60 * 1000);

    const leadIds = await Leads.find({
      inactive: false,
      lastActivityAt: { $lt: threeMinutesAgo },
      $expr: { $gt: [{ $size: "$messages" }, 0] },
    }).select("_id");

    console.log(leadIds);
    if (leadIds.length > 0) {
      await Leads.updateMany(
        { _id: { $in: leadIds } },
        { $set: { inactive: true } }
      );

      const inactiveLeads = await Leads.find({
        _id: { $in: leadIds },
      }).select("messages -_id");
      const fetchedUrgency = await checkUrgency(inactiveLeads);

      const bulkOps = leadIds.map((leadDoc, index) => ({
        updateOne: {
          filter: { _id: leadDoc._id },
          update: { $set: { lead_urgency: fetchedUrgency[index].urgency } },
        },
      }));
      await Leads.bulkWrite(bulkOps);
      await Promise.all(
        leadIds.map(async (doc) => {
          const lead = await Leads.findById(doc._id).lean();
          if (lead) {
            await Promise.all([sendEmailToUser(lead), sendEmailToOwner(lead)]);
          }
        })
      );

      console.log(
        `Marked ${leadIds.length} leads as inactive and update urgency`
      );
    }
  } catch (err) {
    console.log("Some error occured in cron job", err.message);
  }
});
