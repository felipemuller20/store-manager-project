const { ObjectID } = require('mongodb');
const connection = require('./connection');

const createSales = async (itensSold) => {
  const db = await connection();
  const newSale = await db.collection('sales').insertOne({ itensSold });
  return { _id: newSale.insertedId, itensSold };
};

const getAllSales = async () => {
  const db = await connection();
  const allSales = await db.collection('sales').find().toArray();
  return allSales;
};

const getSalesById = async (id) => {
  if (!ObjectID.isValid(id)) return null;
  const db = await connection();
  const sale = await db.collection('sales').findOne({ _id: ObjectID(id) });
  if (!sale) return null;
  return sale;
};

module.exports = {
  createSales,
  getAllSales,
  getSalesById,
};
