const PageData = require("../models/pageModels");

const monthRemoveRow = async (req, res) => {
    const id = req.params.id;
    try {
        const monthAccount = await PageData.deleteOne({ _id: id });
        res.status(200).json(monthAccount)
    } catch (error) {
        res.status(500).json({ message: 'internal server error' })
    }
};

const updateMonth = async (req, res) => {
    const id = req.params.id;
    const filter = { _id: id };
    const { data, index } = req.body;
    const updateData=Object.keys(data).join(',');
    try {
        const updateDoc = {
            $set: {
                [`member.${index}.${updateData}`]: data[updateData]
            }
        };
        const result = await PageData.updateOne(filter, updateDoc);
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: 'internal server error' })
    }
}

module.exports = {
    monthRemoveRow,
    updateMonth
}