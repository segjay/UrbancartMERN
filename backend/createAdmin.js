const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const User = require('./models/User');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');

    // Remove existing admin if any
    await User.deleteOne({ email: 'admin@urbancart.com' });

    const admin = await User.create({
      name: 'Admin',
      email: 'admin@urbancart.com',
      password: 'admin123',
      isAdmin: true,
    });

    console.log('✅ Admin user created!');
    console.log('   Email   :', admin.email);
    console.log('   Password: admin123');
    console.log('   isAdmin :', admin.isAdmin);

    process.exit(0);
  } catch (error) {
    console.error('❌ Failed:', error.message);
    process.exit(1);
  }
};

createAdmin();
