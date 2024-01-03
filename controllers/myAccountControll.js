const PageData = require("../models/pageModels");

const getMyAccount = async (req, res) => {
  try {
    const selfAccount = await PageData.aggregate([
      {
        $unwind: "$member",
      },
      {
        $set: {
          "member.fee": {
            $cond: [
              { $eq: ["$member.fee", ""] },
              0,
              { $toDouble: "$member.fee" },
            ],
          },
          "member.ifound": {
            $cond: [
              { $eq: ["$member.ifound", ""] },
              0,
              { $toDouble: "$member.ifound" },
            ],
          },
          "member.penalty": {
            $cond: [
              { $eq: ["$member.penalty", ""] },
              0,
              { $toDouble: "$member.penalty" },
            ],
          },
          "member.total": {
            $cond: [
              { $eq: ["$member.total", ""] },
              0,
              { $toDouble: "$member.total" },
            ],
          },
        },
      },
      {
        $match: {
          "member.name": req.user.name,
        },
      },
      {
        $group: {
          _id: null,
          totalFee: { $sum: "$member.fee" },
          totalIfound: { $sum: "$member.ifound" },
          totalPenalty: { $sum: "$member.penalty" },
          totalTotal: { $sum: "$member.total" },
        },
      },
    ]);

    if (selfAccount.length === 0) {
      res.status(404).json({ message: "Data not found" });
    } else {
      const result = selfAccount[0];
      res.status(200).json({
        totalFee: result.totalFee,
        totalIfound: result.totalIfound,
        totalPenalty: result.totalPenalty,
        totalTotal: result.totalTotal,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getMyAccount,
};
