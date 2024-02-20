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
          "member.userId": req.user._id,
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

const getSingleMonthData = async (req, res) => {
  try {
    let pipeline = [
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
          "member.userId": req.user._id,
          month: req.params.month,
        },
      },
      {
        $project: {
          _id: 1,
          fee: "$member.fee", 
          ifound: "$member.ifound",
          penalty: "$member.penalty",
          total: "$member.total",
          share: "$member.share",
          month: "$month",
          year: "$year",
        },
      },
    ];

    if (req.query.year && req.query.year !== "All") {
      pipeline[2].$match.year = req.query.year;
    }

    const monthData = await PageData.aggregate(pipeline);

    if (monthData.length === 0) {
      res.status(404).json({ message: "Data not found" });
    } else {
      res.status(200).json(monthData);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getMyAccount,
  getSingleMonthData,
};
