import{c as p,s as m}from"./index-Zl81pyHS.js";const u=p("Send",[["path",{d:"m22 2-7 20-4-9-9-4Z",key:"1q3vgg"}],["path",{d:"M22 2 11 13",key:"nzbqef"}]]),r=async({to:e,subject:a,html:t})=>{if(!e||!a||!t)return{success:!1,error:"Missing required fields"};try{const{data:{session:s}}=await m.auth.getSession(),i=await fetch("https://uitplgqukaxrribgrpvv.supabase.co/functions/v1/send-email",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${(s==null?void 0:s.access_token)||""}`},body:JSON.stringify({to:e,subject:a,html:t})}),c=await i.json();return i.ok?{success:!0,data:c}:(console.error("Email error:",c),{success:!1,error:c.error||"Failed to send email"})}catch(s){return console.error("Email error:",s),{success:!1,error:s.message}}},d=e=>`₱${(e==null?void 0:e.toLocaleString())||0}`,n=e=>e?new Date(e).toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}):"",o=e=>{if(!e)return"";const[a,t]=e.split(":"),s=parseInt(a),i=s>=12?"PM":"AM";return`${s>12?s-12:s===0?12:s}:${t} ${i}`},l={newBookingCustomer:e=>{var a,t;return{subject:`Booking Confirmed - Red Carpet Catering #${(a=e.id)==null?void 0:a.slice(0,8)}`,html:`
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #b91c1c, #991b1b); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
          .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .detail-row { display: flex; padding: 10px 0; border-bottom: 1px solid #f3f4f6; }
          .detail-label { font-weight: bold; width: 140px; color: #6b7280; }
          .total { font-size: 24px; color: #b91c1c; font-weight: bold; text-align: right; margin-top: 20px; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
          .btn { display: inline-block; background: #b91c1c; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin:0;">🎉 Booking Confirmed!</h1>
            <p style="margin:10px 0 0;">Thank you for choosing Red Carpet Catering</p>
          </div>
          <div class="content">
            <p>Dear <strong>${e.customer_name}</strong>,</p>
            <p>Your catering booking has been received and is being processed. Here are your booking details:</p>
            
            <div class="booking-details">
              <div class="detail-row">
                <span class="detail-label">Booking ID:</span>
                <span>#${(t=e.id)==null?void 0:t.slice(0,8).toUpperCase()}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Event Date:</span>
                <span>${n(e.event_date)}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Event Time:</span>
                <span>${o(e.event_time)}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Venue:</span>
                <span>${e.venue}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Menu Package:</span>
                <span>${e.menu_package}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Number of Guests:</span>
                <span>${e.number_of_pax} pax</span>
              </div>
              ${e.motif?`
              <div class="detail-row">
                <span class="detail-label">Motif/Theme:</span>
                <span>${e.motif}</span>
              </div>
              `:""}
              <div class="total">
                Total: ${d(e.total_amount)}
              </div>
            </div>
            
            <p><strong>What's Next?</strong></p>
            <ul>
              <li>Our team will review your booking and confirm within 24 hours</li>
              <li>You may be contacted for additional details or payment arrangements</li>
              <li>Check your booking status anytime on our website</li>
            </ul>
            
            <p style="text-align: center;">
              <a href="https://ceburedcarpetcatering.com/my-orders" class="btn">View My Bookings</a>
            </p>
          </div>
          <div class="footer">
            <p><strong>Red Carpet Food and Catering Services</strong></p>
            <p>📞 0917-187-6510 | 0926-664-2839 | (032) 383-4122</p>
            <p>Premium catering services for all occasions</p>
          </div>
        </div>
      </body>
      </html>
    `}},newBookingAdmin:e=>({subject:`🔔 New Booking Received - ${e.customer_name} - ${n(e.event_date)}`,html:`
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #b91c1c; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
          .booking-card { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #b91c1c; }
          .detail-row { padding: 8px 0; border-bottom: 1px solid #f3f4f6; }
          .label { font-weight: bold; color: #6b7280; }
          .total { font-size: 20px; color: #b91c1c; font-weight: bold; margin-top: 15px; }
          .btn { display: inline-block; background: #b91c1c; color: white; padding: 10px 25px; text-decoration: none; border-radius: 6px; margin-top: 15px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin:0;">🔔 New Catering Booking</h2>
          </div>
          <div class="content">
            <div class="booking-card">
              <h3 style="margin-top:0; color: #b91c1c;">${e.customer_name}</h3>
              <div class="detail-row"><span class="label">📅 Date:</span> ${n(e.event_date)}</div>
              <div class="detail-row"><span class="label">🕐 Time:</span> ${o(e.event_time)}</div>
              <div class="detail-row"><span class="label">📍 Venue:</span> ${e.venue}</div>
              <div class="detail-row"><span class="label">🍽️ Package:</span> ${e.menu_package}</div>
              <div class="detail-row"><span class="label">👥 Guests:</span> ${e.number_of_pax} pax</div>
              <div class="detail-row"><span class="label">📞 Phone:</span> ${e.customer_phone}</div>
              <div class="detail-row"><span class="label">📧 Email:</span> ${e.customer_email||"N/A"}</div>
              ${e.motif?`<div class="detail-row"><span class="label">🎨 Motif:</span> ${e.motif}</div>`:""}
              ${e.special_requests?`<div class="detail-row"><span class="label">📝 Notes:</span> ${e.special_requests}</div>`:""}
              <div class="total">Total: ${d(e.total_amount)}</div>
            </div>
            <p style="text-align: center;">
              <a href="https://ceburedcarpetcatering.com/admin/bookings" class="btn">View in Admin Panel</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `}),newFoodOrderCustomer:e=>{var a,t,s;return{subject:`Order Confirmed - Red Carpet Catering #${(a=e.id)==null?void 0:a.slice(0,8)}`,html:`
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #ea580c, #c2410c); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
          .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .item { padding: 10px 0; border-bottom: 1px solid #f3f4f6; display: flex; justify-content: space-between; }
          .total { font-size: 24px; color: #ea580c; font-weight: bold; text-align: right; margin-top: 20px; padding-top: 15px; border-top: 2px solid #e5e7eb; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin:0;">🛒 Order Confirmed!</h1>
            <p style="margin:10px 0 0;">Your food order is being prepared</p>
          </div>
          <div class="content">
            <p>Dear <strong>${e.customer_name}</strong>,</p>
            <p>Thank you for your order! Here are your order details:</p>
            
            <div class="order-details">
              <p><strong>Order ID:</strong> #${(t=e.id)==null?void 0:t.slice(0,8).toUpperCase()}</p>
              <p><strong>Delivery Date:</strong> ${n(e.delivery_date)}</p>
              <p><strong>Delivery Time:</strong> ${o(e.delivery_time)||"To be confirmed"}</p>
              <p><strong>Delivery Address:</strong> ${e.delivery_address}</p>
              
              <h4 style="margin-top: 20px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Order Items</h4>
              ${((s=e.items)==null?void 0:s.map(i=>`
                <div class="item">
                  <span>${i.name} × ${i.quantity}</span>
                  <span>${d(i.price*i.quantity)}</span>
                </div>
              `).join(""))||""}
              
              <div class="total">
                Total: ${d(e.total_amount)}
              </div>
            </div>
          </div>
          <div class="footer">
            <p><strong>Red Carpet Food and Catering Services</strong></p>
            <p>📞 0917-187-6510 | 0926-664-2839 | (032) 383-4122</p>
          </div>
        </div>
      </body>
      </html>
    `}},newFoodOrderAdmin:e=>{var a;return{subject:`🛒 New Food Order - ${e.customer_name} - ${n(e.delivery_date)}`,html:`
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #ea580c; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
          .order-card { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #ea580c; }
          .item { padding: 8px 0; border-bottom: 1px solid #f3f4f6; }
          .total { font-size: 20px; color: #ea580c; font-weight: bold; margin-top: 15px; }
          .btn { display: inline-block; background: #ea580c; color: white; padding: 10px 25px; text-decoration: none; border-radius: 6px; margin-top: 15px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin:0;">🛒 New Food Order</h2>
          </div>
          <div class="content">
            <div class="order-card">
              <h3 style="margin-top:0; color: #ea580c;">${e.customer_name}</h3>
              <p><strong>📅 Delivery:</strong> ${n(e.delivery_date)} ${e.delivery_time?`at ${o(e.delivery_time)}`:""}</p>
              <p><strong>📍 Address:</strong> ${e.delivery_address}</p>
              <p><strong>📞 Phone:</strong> ${e.customer_phone}</p>
              
              <h4>Items:</h4>
              ${((a=e.items)==null?void 0:a.map(t=>`
                <div class="item">${t.name} × ${t.quantity} - ${d(t.price*t.quantity)}</div>
              `).join(""))||""}
              
              <div class="total">Total: ${d(e.total_amount)}</div>
            </div>
            <p style="text-align: center;">
              <a href="https://ceburedcarpetcatering.com/admin/food-orders" class="btn">View in Admin Panel</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `}},eventReminder:(e,a)=>({subject:`Reminder: Your Event is in ${a} Day${a!==1?"s":""} - Red Carpet Catering`,html:`
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #b91c1c, #991b1b); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
          .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #b91c1c; }
          .detail-row { padding: 10px 0; border-bottom: 1px solid #f3f4f6; }
          .detail-label { font-weight: bold; color: #6b7280; }
          .countdown { font-size: 48px; font-weight: bold; color: #b91c1c; text-align: center; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin:0;">Event Reminder</h1>
            <p style="margin:10px 0 0;">Your event is coming up soon!</p>
          </div>
          <div class="content">
            <p>Dear <strong>${e.customer_name}</strong>,</p>
            <p>This is a friendly reminder about your upcoming event:</p>

            <div class="countdown">${a} day${a!==1?"s":""} to go!</div>

            <div class="booking-details">
              <div class="detail-row"><span class="detail-label">Event Date:</span> ${n(e.event_date)}</div>
              <div class="detail-row"><span class="detail-label">Time:</span> ${o(e.event_time)}</div>
              <div class="detail-row"><span class="detail-label">Venue:</span> ${e.venue}</div>
              <div class="detail-row"><span class="detail-label">Guests:</span> ${e.number_of_pax} pax</div>
              <div class="detail-row"><span class="detail-label">Package:</span> ${e.menu_package}</div>
              <div class="detail-row"><span class="detail-label">Total:</span> ${d(e.total_amount)}</div>
              ${e.payment_status!=="fully_paid"?`
              <div class="detail-row" style="color: #dc2626;">
                <span class="detail-label">Payment Status:</span> ${e.payment_status==="deposit_paid"?"Deposit Paid - Balance Due":"Payment Pending"}
              </div>`:""}
            </div>

            ${e.payment_status!=="fully_paid"?"<p><strong>Please ensure your payment is settled before the event.</strong></p>":""}
            <p>If you have any questions or changes, please contact us as soon as possible.</p>
          </div>
          <div class="footer">
            <p><strong>Red Carpet Food and Catering Services</strong></p>
            <p>0917-187-6510 | 0926-664-2839 | (032) 383-4122</p>
          </div>
        </div>
      </body>
      </html>
    `}),bookingStatusUpdate:(e,a)=>({subject:`Booking ${a.charAt(0).toUpperCase()+a.slice(1)} - Red Carpet Catering`,html:`
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: ${a==="confirmed"?"#059669":a==="cancelled"?"#dc2626":"#b91c1c"}; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
          .status-badge { display: inline-block; padding: 8px 20px; border-radius: 20px; font-weight: bold; background: ${a==="confirmed"?"#d1fae5":a==="cancelled"?"#fee2e2":"#fef3c7"}; color: ${a==="confirmed"?"#059669":a==="cancelled"?"#dc2626":"#d97706"}; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin:0;">Booking Status Update</h1>
          </div>
          <div class="content">
            <p>Dear <strong>${e.customer_name}</strong>,</p>
            <p>Your booking status has been updated:</p>
            <p style="text-align: center; margin: 30px 0;">
              <span class="status-badge">${a.toUpperCase()}</span>
            </p>
            <p><strong>Booking Details:</strong></p>
            <ul>
              <li>Event Date: ${n(e.event_date)}</li>
              <li>Venue: ${e.venue}</li>
              <li>Guests: ${e.number_of_pax} pax</li>
            </ul>
            ${a==="confirmed"?"<p>We look forward to serving you!</p>":""}
            ${a==="cancelled"?"<p>If you have any questions, please contact us.</p>":""}
          </div>
          <div class="footer">
            <p><strong>Red Carpet Food and Catering Services</strong></p>
            <p>📞 0917-187-6510 | 0926-664-2839 | (032) 383-4122</p>
          </div>
        </div>
      </body>
      </html>
    `})},b=async(e,a="redcarpetbookings@gmail.com")=>{const t={customer:null,admin:null};if(e.customer_email){const i=l.newBookingCustomer(e);t.customer=await r({to:e.customer_email,subject:i.subject,html:i.html})}const s=l.newBookingAdmin(e);return t.admin=await r({to:a,subject:s.subject,html:s.html}),t},v=async(e,a="redcarpetbookings@gmail.com")=>{const t={customer:null,admin:null};if(e.customer_email){const i=l.newFoodOrderCustomer(e);t.customer=await r({to:e.customer_email,subject:i.subject,html:i.html})}const s=l.newFoodOrderAdmin(e);return t.admin=await r({to:a,subject:s.subject,html:s.html}),t},h=async e=>{if(!e.customer_email)return{success:!1,error:"No customer email"};const a=Math.ceil((new Date(e.event_date)-new Date)/(1e3*60*60*24)),t=l.eventReminder(e,Math.max(a,0));return await r({to:e.customer_email,subject:t.subject,html:t.html})};export{u as S,b as a,h as b,v as s};
