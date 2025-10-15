/*
  Seed script to create:
   - Division: Engineering
   - Admin user: admin / password123
   - CO user: co / password123
   - Officer user: officer / password123 (linked to Engineering)
   - Sailor user: sailor / password123 (linked to Engineering)
*/
require('dotenv').config();
const mongoose = require('mongoose');
const config = require('./config');
const User = require('./models/User');
const Division = require('./models/Division');
const Officer = require('./models/Officer');
const Sailor = require('./models/Sailor');

async function seed() {
  await mongoose.connect(config.MONGO_URI);
  console.log('Connected to DB');

  // clear minimal collections (be careful)
  await User.deleteMany({});
  await Division.deleteMany({});
  await Officer.deleteMany({});
  await Sailor.deleteMany({});

  const division_egineering = await Division.create({ name: 'Engineering' });

  const admin = await User.create({ serviceNo: 'admin', password: 'admin', role: 'admin' });
  const co = await User.create({ serviceNo: 'co', password: 'co', role: 'co' });
  const officerUser = await User.create({ serviceNo: 'officer1', password: 'officer1', role: 'officer' });
  const sailorUser = await User.create({ serviceNo: 'sailor1', password: 'sailor1', role: 'sailor' });

  const officer = await Officer.create({ user: officerUser._id, name: 'officername1', rank: 'Lieutenant', division: division_egineering._id });
  const sailor = await Sailor.create({ user: sailorUser._id, name: 'sailorname1', division: division_egineering._id });

  console.log('Seed finished. Users:');
  console.log({ admin: admin.serviceNo, co: co.serviceNo, officer: officerUser.serviceNo, sailor: sailorUser.serviceNo });
  process.exit(0);
}

seed().catch(err=>{ console.error(err); process.exit(1); });
