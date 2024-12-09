export const welcomeEmail = (email) => ({
  from: '"Ipsum Grocery" <grocery.ipsum@gmail.com>',
  to: email,
  subject: "Welcome to Our Newsletter! 🎉",
  html: `
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; color: #333;">
      <div style="background-color: #4CAF50; padding: 20px; text-align: center;">
        <img src="https://i.ibb.co/BwbvSjd/resim-2024-12-09-061250886.png" alt="Ipsum Grocery Logo" style="max-width: 150px;">
      </div>
      
      <div style="padding: 20px; background-color: #ffffff;">
        <h1 style="color: #4CAF50; text-align: center;">Welcome to Ipsum Grocery! 🌟</h1>
        
        <p style="font-size: 16px; line-height: 1.6;">Dear Valued Customer,</p>
        
        <p style="font-size: 16px; line-height: 1.6;">Thank you for subscribing to our newsletter! We're excited to have you join our community of food enthusiasts.</p>
        
        <p style="font-size: 16px; line-height: 1.6;">Here's what you can expect from us:</p>
        
        <ul style="font-size: 16px; line-height: 1.6;">
          <li>Weekly special offers and discounts 🏷️</li>
          <li>New product announcements 🆕</li>
          <li>Seasonal recipes and cooking tips 👨‍🍳</li>
          <li>Exclusive subscriber-only deals 🎁</li>
        </ul>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://mehmethandoru.com" style="background-color: #4CAF50; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Visit Our Store</a>
        </div>
        
        <p style="font-size: 16px; line-height: 1.6;">Follow us on social media:</p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="#" style="margin: 0 10px;">📱 Instagram</a>
          <a href="#" style="margin: 0 10px;">👍 Facebook</a>
          <a href="#" style="margin: 0 10px;">🐦 Twitter</a>
        </div>
      </div>
      
      <div style="background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px;">
        <p>© 2024 Ipsum Grocery. All rights reserved.</p>
        <p>If you wish to unsubscribe, <a href="#" style="color: #4CAF50;">click here</a></p>
      </div>
    </div>
  `,
});