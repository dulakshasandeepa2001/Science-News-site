// Configuration for Newsletter and Automated Article Email Alerts
// Powered by Brevo (formerly Sendinblue) & Web3Forms guaranteed backup delivery.

export const NEWSLETTER_CONFIG = {
  // Brevo Subscription Form Action URL or Share URL
  // In Brevo: Contacts -> Forms -> Create a subscription form -> Share / HTML code
  // Example: "https://xxxxxxxx.sibforms.com/serve/MUIEAI..."
  brevoFormActionUrl: import.meta.env.VITE_BREVO_FORM_URL || "",

  // Backup delivery: Sends instant notification to your Gmail whenever someone subscribes
  web3FormsAccessKey: "09db56eb-811c-43f6-95ff-4ce291ca8234",
  ownerEmail: "sandeepadulaksha93@gmail.com",

  // Site RSS Feed used for Brevo's automated RSS / Blog update campaigns
  rssFeedUrl: "https://sciencenewshub.click/rss.xml",
  siteUrl: "https://sciencenewshub.click"
};
