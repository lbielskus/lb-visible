# 📊 **GOOGLE ANALYTICS SETUP GUIDE**

## ✅ **STEP-BY-STEP SETUP**

### **Step 1: Create Google Analytics Account**

1. Go to [analytics.google.com](https://analytics.google.com)
2. Click **"Start measuring"**
3. Enter account name: **"LB Visible"**
4. Click **"Next"**

### **Step 2: Create Property**

1. Property name: **"LB Visible Website"**
2. Reporting time zone: **Europe/Vilnius**
3. Currency: **EUR**
4. Click **"Next"**

### **Step 3: Business Information**

1. Industry category: **"Technology"**
2. Business size: **"Small business"**
3. How do you plan to use GA4: **"Get business insights"**
4. Click **"Next"**

### **Step 4: Create Data Stream**

1. Choose platform: **"Web"**
2. Website URL: **"https://www.lbvisible.com"**
3. Stream name: **"LB Visible Main"**
4. Click **"Create stream"**

### **Step 5: Get Measurement ID**

- Copy the **Measurement ID** (format: G-XXXXXXXXXX)
- This will be used in your website

### **Step 6: Environment Setup**

1. Create `.env.local` file in your project root
2. Add your Measurement ID:
   ```
   NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
   ```
3. Replace `G-XXXXXXXXXX` with your actual Measurement ID

### **Step 7: Verify Installation**

1. Deploy your website
2. Visit your website
3. Check Google Analytics Real-Time reports
4. Verify data is being collected

## 🎯 **LANGUAGE TRACKING FEATURES**

### **Automatic Language Detection**

- ✅ **English pages** tracked with language parameter
- ✅ **Lithuanian pages** tracked with language parameter
- ✅ **Page views** tracked for both languages
- ✅ **User behavior** analyzed by language preference

### **Custom Events**

- ✅ **Language switching** events
- ✅ **Page type** tracking (services, blog, etc.)
- ✅ **User engagement** by language
- ✅ **Conversion tracking** for both languages

## 📈 **ANALYTICS DASHBOARD SETUP**

### **Create Custom Reports**

1. **Language Performance Report**

   - Compare English vs Lithuanian page performance
   - Track user engagement by language
   - Monitor conversion rates

2. **Page Performance Report**

   - Track most visited pages
   - Monitor bounce rates
   - Analyze user journey

3. **Conversion Funnel**
   - Track contact form submissions
   - Monitor pricing page visits
   - Analyze checkout process

### **Set Up Goals**

1. **Contact Form Submissions**
2. **Pricing Page Visits**
3. **Blog Engagement**
4. **Language Switches**

## 🔧 **ADVANCED CONFIGURATION**

### **Enhanced Ecommerce Tracking**

```javascript
// Track product views
gtag('event', 'view_item', {
  currency: 'EUR',
  value: 59.9,
  items: [
    {
      item_id: 'business-plan',
      item_name: 'Business Plan',
      price: 59.9,
      quantity: 1,
    },
  ],
});
```

### **Custom Dimensions**

- **Language**: Track user language preference
- **Page Type**: Categorize pages (services, blog, etc.)
- **User Type**: New vs returning visitors
- **Traffic Source**: How users found your site

## 📊 **REPORTING SCHEDULE**

### **Weekly Reports**

- Page performance by language
- User engagement metrics
- Conversion tracking
- Traffic source analysis

### **Monthly Reports**

- Overall website performance
- Language preference trends
- Content performance
- SEO impact analysis

## 🚀 **NEXT STEPS**

1. **Set up Google Search Console** integration
2. **Create custom audiences** for remarketing
3. **Set up conversion tracking** for forms
4. **Configure ecommerce tracking** for pricing pages
5. **Create automated reports** for stakeholders

---

**✅ Google Analytics is now ready to track both English and Lithuanian versions of your website!**
