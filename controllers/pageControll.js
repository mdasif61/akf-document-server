const PageData = require("../models/pageModels");

const fullPageWithData = async (req, res) => {
    const { month, account, year, member } = req.body;
    const pages = await PageData.create({
        month, account, year, member
    });
    if (pages) {
        res.status(201).send(pages)
    } else {
        return res.status(404).send({ message: 'page not found' })
    }
};

const allPages = async (req, res) => {
    try {
        const id = req.params.id;
        let pages;
        if (!id) {
            pages = await PageData.find({})
        } else {
            pages = await PageData.findOne({ _id: id })
        }
        if (!pages) {
            res.status(404).json({ message: 'page not found' })
        }
        res.status(200).json(pages)
    } catch (error) {
        console.log('Error: ', error);
        res.status(500).json({ message: 'Internal server error' })
    }

};

const chartAccount = async (req, res) => {
    try {
        const accountChart = await PageData.aggregate([
            {
                $unwind: "$member"
            },
            {
                $set: {
                    "member.fee": {
                        $cond: [
                            { $eq: ["$member.fee", ""] },
                            { $toDouble: "$member.fee" }
                        ]
                    },
                    "member.ifound": {
                        $cond: [
                            { $eq: ["$member.ifound", ""] },
                            0,
                            { $toDouble: "$member.ifound" }
                        ]
                    },
                    "member.penalty": {
                        $cond: [
                            { $eq: ["$member.penalty", ""] },
                            0,
                            { $toDouble: "$member.penalty" }
                        ]
                    },
                    "member.total": {
                        $cond: [
                            { $eq: ["$member.total", ""] },
                            0,
                            { $toDouble: "$member.total" }
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalFee: { $sum: "$member.fee" },
                    totalIfound: { $sum: "$member.ifound" },
                    totalPenalty: { $sum: "$member.penalty" },
                    totalTotal: { $sum: "$member.total" }
                }
            }
        ]);

        if (accountChart.length === 0) {
            res.status(404).json({ message: 'Data not found' });
        } else {
            const result = accountChart[0];
            res.status(200).json({
                totalFee: result.totalFee,
                totalIfound: result.totalIfound,
                totalPenalty: result.totalPenalty,
                totalTotal: result.totalTotal
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const searchPage = async (req, res) => {
    const searchText = req.query.text;
    try {
        const result = await PageData.find({
            $or: [
                { month: { $regex: searchText, $options: 'i' } },
                { year: { $regex: searchText, $options: 'i' } }
            ]
        });
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: 'internal server error' })
    }
}


module.exports = {
    fullPageWithData,
    allPages,
    chartAccount,
    searchPage
}