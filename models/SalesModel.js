// const { ObjectId } = require('mongodb');
const connect = require('./connection');

const create = async (itensSold) => {
  const db = await connect();
  const sales = await db.collection('sales').insertOne({ itensSold });

  return { _id: sales.insertedId, itensSold };
};

// const findByName = async (name) => {
//   const db = await connect();
//   const product = await db.collection('sales').findOne({ name });
//   return product;
// };

// const getAll = async () => {
//   const db = await connect();
//   const products = await db.collection('sales').find().toArray();
//   return products;
// };

// const getById = async (id) => {
//   if (!ObjectId.isValid(id)) return null;
  
//   const db = await connect();
//   const product = await db.collection('sales').findOne(ObjectId(id));
//   return product;
// };

// const update = async (id, name, quantity) => {
//   if (!ObjectId.isValid(id)) return null;

//   const db = await connect();
//   await db.collection('sales')
//     .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
//     return { id, name, quantity };
// };

// const exclude = async (id) => {
//   if (!ObjectId.isValid(id)) return null;

//   const db = await connect();
//   await db.collection('sales').deleteOne({ _id: ObjectId(id) });
// };

module.exports = {
  create,
  // findByName,
  // getAll,
  // getById,
  // update,
  // exclude,
};