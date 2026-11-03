// Configuration for Newsletter and Automated Article Email Alerts
// Powered by Brevo (formerly Sendinblue) & Web3Forms guaranteed backup delivery.

export const NEWSLETTER_CONFIG = {
  // Official Brevo Subscription Form Endpoint
  brevoFormActionUrl: import.meta.env.VITE_BREVO_FORM_URL || "https://4c6fab7f.sibforms.com/serve/MUIFAA28S5PqUdZ5hIo4beTSgCyd7cAOgAxzuyX0fCPeoxT8h8ePy6kHrRl9oJcLm9Pdkv8Syu98iq6Oio0lHZ-4fgdMC0yDn5S1NZn7Uf8ztKItxuPEWvd5CKZHWciykpf1NotPwFark-RAZ-pWUZhvxCPlI683Dqgf8T-aUynaL5XN4VqO5ASKysWAKW9RUH9nG31iozZrns7tVQ==",

  // Backup delivery: Sends instant notification to your Gmail whenever someone subscribes
  web3FormsAccessKey: "09db56eb-811c-43f6-95ff-4ce291ca8234",
  ownerEmail: "sandeepadulaksha93@gmail.com",

  // Site RSS Feed used for Brevo's automated RSS / Blog update campaigns
  rssFeedUrl: "https://sciencenewshub.click/rss.xml",
  siteUrl: "https://sciencenewshub.click"
};
