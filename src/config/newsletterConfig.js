// Configuration for Newsletter and Automated Article Email Alerts
// Supports MailerLite embedded forms and Web3Forms backup delivery.

export const NEWSLETTER_CONFIG = {
  // If you have a MailerLite account, paste your Form Action URL or Form ID below
  // Example: "https://assets.mailerlite.com/jsonp/123456/forms/7891011/subscribe"
  mailerLiteActionUrl: import.meta.env.VITE_MAILERLITE_ACTION_URL || "",

  // Backup delivery: Sends instant notification to your Gmail whenever someone subscribes
  web3FormsAccessKey: "09db56eb-811c-43f6-95ff-4ce291ca8234",
  ownerEmail: "sandeepadulaksha93@gmail.com",

  // Site RSS Feed used for MailerLite's automated RSS-to-Email campaigns
  rssFeedUrl: "https://sciencenewshub.click/rss.xml",
  siteUrl: "https://sciencenewshub.click"
};
