const MemberData = require("../models/memberModels");

const addMember = async (req, res) => {
    const { name, mobile, date, share, fee, ifound, penalty, total, month, account, year,userId } = req.body;
    const member = await MemberData.create({
        name,
        mobile,
        date,
        share,
        fee,
        ifound,
        penalty,
        total,
        month,
        account,
        year,
        userId
    })
    if (member) {
        res.status(201).json({
            _id: member._id,
        })
    }
};

const getMember = async (req, res) => {
    const member = await MemberData.find({});
    if (!member) {
        return res.status(404).json({ message: 'Member not found' })
    };
    res.status(200).json(member)
}

const deleteMember = async (req, res) => {
    const id = req.params.id;
    const member = await MemberData.deleteOne({ _id: id })
    res.json(member)
}

const deleteAllMember = async (req, res) => {
    try {
        const { allUser } = req.body;
        const filterUser = allUser ? allUser.map(user => user.name)  : []
        const checkFinialFilterUser={
            _id:{$nin:['admin_id_here', req.user._id]},
            name:{$nin:filterUser}
        }
        const allMember = await MemberData.deleteMany(checkFinialFilterUser);
        res.json({ message: 'All Member Deleted Success', deletedCount: allMember.deletedCount })
    } catch (error) {
        res.status(404).json({ message: 'internal server error' })
    }
}

const updateMember = async (req, res) => {
    const id = req.params.id;
    const filter = { _id: id }
    const { data } = req.body;
    const updateData = Object.keys(data).join(',');
    try {
        const updateDoc = {
            $set: {
                [updateData]: data[updateData]
            }
        };
        const result = await MemberData.updateOne(filter, updateDoc);
        res.send(result)
    } catch (error) {
        console.log(`Error updateing member : ${error}`)
        res.status(500).send('Internal server error')
    }
}

const fixedUserRowUpdate = async (req, res) => {
    const ids = req?.params?.id.split(',');
    const blankData = req.body;

    const result = await MemberData.updateMany({ _id: { $in: ids } }, {
        $set: {
            mobile: blankData?.mobile,
            date: blankData?.date,
            share: blankData?.share,
            fee: blankData?.fee,
            ifound: blankData?.ifound,
            penalty: blankData?.penalty,
            total: blankData?.total,
            month: blankData?.month,
            account: blankData?.account,
            year: blankData?.year
        }
    })
    res.status(202).send(result)

}

module.exports = { addMember, getMember, deleteMember, updateMember, deleteAllMember, fixedUserRowUpdate };