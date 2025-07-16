import newsletterModel from '../models/newsletterModel.js';
import transporter from '../config/nodemailer.js';

// Subscribe to newsletter
export const subscribeNewsletter = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ 
                success: false, 
                message: 'Email is required' 
            });
        }

        // Check if email already exists
        const existingSubscriber = await newsletterModel.findOne({ email: email.toLowerCase() });
        
        if (existingSubscriber) {
            return res.status(400).json({ 
                success: false, 
                message: 'Email is already subscribed to newsletter' 
            });
        }

        // Create new subscription
        const newSubscriber = new newsletterModel({
            email: email.toLowerCase()
        });

        await newSubscriber.save();

        res.status(201).json({ 
            success: true, 
            message: 'Successfully subscribed to newsletter' 
        });

    } catch (error) {
        console.error('Newsletter subscription error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error' 
        });
    }
};

// Send reminder email to all subscribers
export const sendReminderEmails = async () => {
    try {
      const subscribers = await newsletterModel.find();
  
      if (subscribers.length === 0) {
        console.log('No subscribers to send emails to');
        return;
      }
  
      const emailPromises = subscribers.map(async (subscriber) => {
        try {
            const mailOptions = {
                from: process.env.SENDER_EMAIL,
                to: subscriber.email,
                subject: 'Come Back to PEGASIO! 🚀',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <h1 style="color: #333; margin-bottom: 10px;">Welcome Back to PEGASIO!</h1>
                            <p style="color: #666; font-size: 16px;">We miss you! Come back and explore our amazing features.</p>
                        </div>
                        
                        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                            <h2 style="color: #333; margin-bottom: 15px;">What's New?</h2>
                            <ul style="color: #555; line-height: 1.6;">
                                <li>Discover our latest products and services</li>
                                <li>Read reviews from our satisfied customers</li>
                                <li>Stay updated with our latest news and updates</li>
                                <li>Connect with our community</li>
                            </ul>
                        </div>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}" 
                               style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                                Visit PEGASIO Now
                            </a>
                        </div>
                    </div>
                `
            };
          const info = await transporter.sendMail(mailOptions);
          console.log(`Email sent to ${subscriber.email}: ${info.response}`);
  
        } catch (emailError) {
          console.error(`Failed to send email to ${subscriber.email}:`, emailError);
        }
      });
  
      await Promise.allSettled(emailPromises);
      console.log(`Reminder email campaign completed. Sent to ${subscribers.length} subscribers.`);
  
    } catch (error) {
      console.error('Send reminder emails error:', error);
    }
  };
  