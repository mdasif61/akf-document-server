const getAdmin = async (req, res) => {
  const user=req.user;
  if(!user?.role==='admin'){
    res.send({admin:false})
  }
  const result={admin:user?.role==='admin'};
  res.send(result)
};

module.exports = {
  getAdmin, 
};
  