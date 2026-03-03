import{h as ge,r as p,m as he,j as e,X as fe,g as Me,f as Y,k as W,s as N,i as ze,d as Oe,L as Be,C as Fe,b as Le,P as Ie}from"./index-Dmhg68s_.js";import{T as Re}from"./SkeletonLoaders-Bmh7XY-v.js";import{e as Ue,a as Ve,P as He}from"./PaymentTracker-CHln6k6t.js";import{A as Ye}from"./alert-circle-BlCBIhdr.js";import{C as We}from"./clock-D0yrwDus.js";import{M as be}from"./map-pin-CICCQpJ6.js";import{C as Ge}from"./credit-card-NxRgNN9e.js";import{S as ye}from"./save-DDtaDfXh.js";import{A as Qe}from"./arrow-left-Dk1ccszz.js";import{S as Je}from"./search-BeH1pdlb.js";import{S as Xe}from"./send-D5MhxipP.js";import{P as Ke}from"./pen-Bc-mMA8a.js";import{M as Ze}from"./mail-CJ1WwI8R.js";import{M as et}from"./minus-DBSr4NuJ.js";import{P as tt}from"./plus-BJmRQEAy.js";import{C as st}from"./check-BV4MEAsn.js";import"./trash-2-iYPWqzry.js";import"./alert-triangle-CcWMhmL6.js";const at=ge("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]),nt=ge("Filter",[["polygon",{points:"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3",key:"1yg77f"}]]);function rt({booking:s,onClose:o,onSave:m}){var E;const[n,c]=p.useState({customer_name:"",customer_phone:"",customer_email:"",venue:"",event_date:"",event_time:"",number_of_pax:60,motif:"",special_requests:"",status:"pending",payment_status:"unpaid",deposit_amount:0,payment_notes:"",total_amount:0}),[g,b]=p.useState(!1),[w,k]=p.useState(""),[A,a]=p.useState("");p.useEffect(()=>{s&&c({customer_name:s.customer_name||"",customer_phone:s.customer_phone||"",customer_email:s.customer_email||"",venue:s.venue||"",event_date:s.event_date||"",event_time:s.event_time||"",number_of_pax:s.number_of_pax||60,motif:s.motif||"",special_requests:s.special_requests||"",status:s.status||"pending",payment_status:s.payment_status||"unpaid",deposit_amount:s.deposit_amount||0,payment_notes:s.payment_notes||"",total_amount:s.total_amount||0})},[s]);const j=async i=>{i.preventDefault(),b(!0),k(""),a("");try{const y={customer_name:n.customer_name,customer_phone:n.customer_phone,customer_email:n.customer_email,venue:n.venue,event_date:n.event_date,event_time:n.event_time,number_of_pax:n.number_of_pax,motif:n.motif,special_requests:n.special_requests,status:n.status,payment_status:n.payment_status,deposit_amount:n.deposit_amount,payment_notes:n.payment_notes,total_amount:n.total_amount};n.payment_status==="deposit_paid"&&!s.deposit_paid_at&&(y.deposit_paid_at=new Date().toISOString()),n.payment_status==="fully_paid"&&!s.balance_paid_at&&(y.balance_paid_at=new Date().toISOString());const{error:P}=await N.from("bookings").update(y).eq("id",s.id);if(P)throw P;a("Booking updated successfully!"),setTimeout(()=>{m==null||m(),o()},1e3)}catch(y){k(y.message||"Failed to update booking")}finally{b(!1)}},$=[];for(let i=6;i<=22;i++)["00","30"].forEach(y=>{const P=i>12?i-12:i===0?12:i,z=i>=12?"PM":"AM";$.push({value:`${i.toString().padStart(2,"0")}:${y}`,label:`${P}:${y} ${z}`})});const M=he[s==null?void 0:s.menu_package];return e.jsx("div",{className:"fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto",children:e.jsxs("div",{className:"bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto",children:[e.jsxs("div",{className:"flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-xl font-bold text-gray-800",children:"Edit Booking"}),e.jsxs("p",{className:"text-sm text-gray-500",children:["#",(E=s==null?void 0:s.id)==null?void 0:E.slice(0,8)," • ",M==null?void 0:M.name]})]}),e.jsx("button",{onClick:o,className:"p-2 hover:bg-gray-100 rounded-lg",children:e.jsx(fe,{size:20})})]}),e.jsxs("form",{onSubmit:j,className:"p-6 space-y-6",children:[w&&e.jsxs("div",{className:"bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2",children:[e.jsx(Ye,{size:20}),w]}),A&&e.jsxs("div",{className:"bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2",children:[e.jsx(Me,{size:20}),A]}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-semibold text-gray-800 mb-3",children:"Customer Information"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Name"}),e.jsx("input",{type:"text",value:n.customer_name,onChange:i=>c({...n,customer_name:i.target.value}),className:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Phone"}),e.jsx("input",{type:"tel",value:n.customer_phone,onChange:i=>c({...n,customer_phone:i.target.value}),className:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]}),e.jsxs("div",{className:"md:col-span-2",children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Email"}),e.jsx("input",{type:"email",value:n.customer_email,onChange:i=>c({...n,customer_email:i.target.value}),className:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]})]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-semibold text-gray-800 mb-3",children:"Event Details"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Event Date"}),e.jsxs("div",{className:"relative",children:[e.jsx(Y,{className:"absolute left-3 top-2.5 text-gray-400",size:18}),e.jsx("input",{type:"date",value:n.event_date,onChange:i=>c({...n,event_date:i.target.value}),className:"w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Event Time"}),e.jsxs("div",{className:"relative",children:[e.jsx(We,{className:"absolute left-3 top-2.5 text-gray-400",size:18}),e.jsx("select",{value:n.event_time,onChange:i=>c({...n,event_time:i.target.value}),className:"w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none bg-white",children:$.map(i=>e.jsx("option",{value:i.value,children:i.label},i.value))})]})]}),e.jsxs("div",{className:"md:col-span-2",children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Venue"}),e.jsxs("div",{className:"relative",children:[e.jsx(be,{className:"absolute left-3 top-2.5 text-gray-400",size:18}),e.jsx("input",{type:"text",value:n.venue,onChange:i=>c({...n,venue:i.target.value}),className:"w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Number of Guests"}),e.jsxs("div",{className:"relative",children:[e.jsx(W,{className:"absolute left-3 top-2.5 text-gray-400",size:18}),e.jsx("input",{type:"number",min:"30",value:n.number_of_pax,onChange:i=>c({...n,number_of_pax:parseInt(i.target.value)}),className:"w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Total Amount (₱)"}),e.jsx("input",{type:"number",value:n.total_amount,onChange:i=>c({...n,total_amount:parseInt(i.target.value)}),className:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]})]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-semibold text-gray-800 mb-3",children:"Status & Payment"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Booking Status"}),e.jsxs("select",{value:n.status,onChange:i=>c({...n,status:i.target.value}),className:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none bg-white",children:[e.jsx("option",{value:"pending",children:"Pending"}),e.jsx("option",{value:"confirmed",children:"Confirmed"}),e.jsx("option",{value:"completed",children:"Completed"}),e.jsx("option",{value:"cancelled",children:"Cancelled"})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Payment Status"}),e.jsxs("div",{className:"relative",children:[e.jsx(Ge,{className:"absolute left-3 top-2.5 text-gray-400",size:18}),e.jsxs("select",{value:n.payment_status,onChange:i=>c({...n,payment_status:i.target.value}),className:"w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none bg-white",children:[e.jsx("option",{value:"unpaid",children:"Unpaid"}),e.jsx("option",{value:"deposit_paid",children:"Deposit Paid"}),e.jsx("option",{value:"fully_paid",children:"Fully Paid"}),e.jsx("option",{value:"refunded",children:"Refunded"})]})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Deposit Amount (₱)"}),e.jsx("input",{type:"number",value:n.deposit_amount,onChange:i=>c({...n,deposit_amount:parseInt(i.target.value)||0}),className:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Balance Due"}),e.jsxs("div",{className:"px-4 py-2 bg-gray-100 rounded-lg font-semibold text-red-700",children:["₱",(n.total_amount-n.deposit_amount).toLocaleString()]})]})]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-semibold text-gray-800 mb-3",children:"Other Details"}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Motif/Theme"}),e.jsx("input",{type:"text",value:n.motif,onChange:i=>c({...n,motif:i.target.value}),className:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Special Requests"}),e.jsx("textarea",{value:n.special_requests,onChange:i=>c({...n,special_requests:i.target.value}),rows:2,className:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Payment Notes"}),e.jsx("textarea",{value:n.payment_notes,onChange:i=>c({...n,payment_notes:i.target.value}),rows:2,placeholder:"e.g., GCash payment received, reference #12345",className:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]})]})]}),e.jsxs("div",{className:"flex gap-3 pt-4 border-t",children:[e.jsxs("button",{type:"submit",disabled:g,className:"flex-1 bg-red-700 text-white py-3 rounded-xl font-medium hover:bg-red-800 disabled:opacity-50 flex items-center justify-center gap-2",children:[e.jsx(ye,{size:18})," ",g?"Saving...":"Save Changes"]}),e.jsx("button",{type:"button",onClick:o,className:"px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50",children:"Cancel"})]})]})]})})}const ue=async({to:s,subject:o,html:m})=>{if(!s||!o||!m)return{success:!1,error:"Missing required fields"};try{const{data:{session:n}}=await N.auth.getSession(),c=await fetch("https://uitplgqukaxrribgrpvv.supabase.co/functions/v1/send-email",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${(n==null?void 0:n.access_token)||""}`},body:JSON.stringify({to:s,subject:o,html:m})}),g=await c.json();return c.ok?{success:!0,data:g}:(console.error("Email error:",g),{success:!1,error:g.error||"Failed to send email"})}catch(n){return console.error("Email error:",n),{success:!1,error:n.message}}},F=s=>`₱${(s==null?void 0:s.toLocaleString())||0}`,T=s=>s?new Date(s).toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}):"",R=s=>{if(!s)return"";const[o,m]=s.split(":"),n=parseInt(o),c=n>=12?"PM":"AM";return`${n>12?n-12:n===0?12:n}:${m} ${c}`},pe={newBookingCustomer:s=>{var o,m;return{subject:`Booking Confirmed - Red Carpet Catering #${(o=s.id)==null?void 0:o.slice(0,8)}`,html:`
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
            <p>Dear <strong>${s.customer_name}</strong>,</p>
            <p>Your catering booking has been received and is being processed. Here are your booking details:</p>
            
            <div class="booking-details">
              <div class="detail-row">
                <span class="detail-label">Booking ID:</span>
                <span>#${(m=s.id)==null?void 0:m.slice(0,8).toUpperCase()}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Event Date:</span>
                <span>${T(s.event_date)}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Event Time:</span>
                <span>${R(s.event_time)}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Venue:</span>
                <span>${s.venue}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Menu Package:</span>
                <span>${s.menu_package}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Number of Guests:</span>
                <span>${s.number_of_pax} pax</span>
              </div>
              ${s.motif?`
              <div class="detail-row">
                <span class="detail-label">Motif/Theme:</span>
                <span>${s.motif}</span>
              </div>
              `:""}
              <div class="total">
                Total: ${F(s.total_amount)}
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
    `}},newBookingAdmin:s=>({subject:`🔔 New Booking Received - ${s.customer_name} - ${T(s.event_date)}`,html:`
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
              <h3 style="margin-top:0; color: #b91c1c;">${s.customer_name}</h3>
              <div class="detail-row"><span class="label">📅 Date:</span> ${T(s.event_date)}</div>
              <div class="detail-row"><span class="label">🕐 Time:</span> ${R(s.event_time)}</div>
              <div class="detail-row"><span class="label">📍 Venue:</span> ${s.venue}</div>
              <div class="detail-row"><span class="label">🍽️ Package:</span> ${s.menu_package}</div>
              <div class="detail-row"><span class="label">👥 Guests:</span> ${s.number_of_pax} pax</div>
              <div class="detail-row"><span class="label">📞 Phone:</span> ${s.customer_phone}</div>
              <div class="detail-row"><span class="label">📧 Email:</span> ${s.customer_email||"N/A"}</div>
              ${s.motif?`<div class="detail-row"><span class="label">🎨 Motif:</span> ${s.motif}</div>`:""}
              ${s.special_requests?`<div class="detail-row"><span class="label">📝 Notes:</span> ${s.special_requests}</div>`:""}
              <div class="total">Total: ${F(s.total_amount)}</div>
            </div>
            <p style="text-align: center;">
              <a href="https://ceburedcarpetcatering.com/admin/bookings" class="btn">View in Admin Panel</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `}),newFoodOrderCustomer:s=>{var o,m,n;return{subject:`Order Confirmed - Red Carpet Catering #${(o=s.id)==null?void 0:o.slice(0,8)}`,html:`
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
            <p>Dear <strong>${s.customer_name}</strong>,</p>
            <p>Thank you for your order! Here are your order details:</p>
            
            <div class="order-details">
              <p><strong>Order ID:</strong> #${(m=s.id)==null?void 0:m.slice(0,8).toUpperCase()}</p>
              <p><strong>Delivery Date:</strong> ${T(s.delivery_date)}</p>
              <p><strong>Delivery Time:</strong> ${R(s.delivery_time)||"To be confirmed"}</p>
              <p><strong>Delivery Address:</strong> ${s.delivery_address}</p>
              
              <h4 style="margin-top: 20px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Order Items</h4>
              ${((n=s.items)==null?void 0:n.map(c=>`
                <div class="item">
                  <span>${c.name} × ${c.quantity}</span>
                  <span>${F(c.price*c.quantity)}</span>
                </div>
              `).join(""))||""}
              
              <div class="total">
                Total: ${F(s.total_amount)}
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
    `}},newFoodOrderAdmin:s=>{var o;return{subject:`🛒 New Food Order - ${s.customer_name} - ${T(s.delivery_date)}`,html:`
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
              <h3 style="margin-top:0; color: #ea580c;">${s.customer_name}</h3>
              <p><strong>📅 Delivery:</strong> ${T(s.delivery_date)} ${s.delivery_time?`at ${R(s.delivery_time)}`:""}</p>
              <p><strong>📍 Address:</strong> ${s.delivery_address}</p>
              <p><strong>📞 Phone:</strong> ${s.customer_phone}</p>
              
              <h4>Items:</h4>
              ${((o=s.items)==null?void 0:o.map(m=>`
                <div class="item">${m.name} × ${m.quantity} - ${F(m.price*m.quantity)}</div>
              `).join(""))||""}
              
              <div class="total">Total: ${F(s.total_amount)}</div>
            </div>
            <p style="text-align: center;">
              <a href="https://ceburedcarpetcatering.com/admin/food-orders" class="btn">View in Admin Panel</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `}},bookingStatusUpdate:(s,o)=>({subject:`Booking ${o.charAt(0).toUpperCase()+o.slice(1)} - Red Carpet Catering`,html:`
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: ${o==="confirmed"?"#059669":o==="cancelled"?"#dc2626":"#b91c1c"}; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
          .status-badge { display: inline-block; padding: 8px 20px; border-radius: 20px; font-weight: bold; background: ${o==="confirmed"?"#d1fae5":o==="cancelled"?"#fee2e2":"#fef3c7"}; color: ${o==="confirmed"?"#059669":o==="cancelled"?"#dc2626":"#d97706"}; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin:0;">Booking Status Update</h1>
          </div>
          <div class="content">
            <p>Dear <strong>${s.customer_name}</strong>,</p>
            <p>Your booking status has been updated:</p>
            <p style="text-align: center; margin: 30px 0;">
              <span class="status-badge">${o.toUpperCase()}</span>
            </p>
            <p><strong>Booking Details:</strong></p>
            <ul>
              <li>Event Date: ${T(s.event_date)}</li>
              <li>Venue: ${s.venue}</li>
              <li>Guests: ${s.number_of_pax} pax</li>
            </ul>
            ${o==="confirmed"?"<p>We look forward to serving you!</p>":""}
            ${o==="cancelled"?"<p>If you have any questions, please contact us.</p>":""}
          </div>
          <div class="footer">
            <p><strong>Red Carpet Food and Catering Services</strong></p>
            <p>📞 0917-187-6510 | 0926-664-2839 | (032) 383-4122</p>
          </div>
        </div>
      </body>
      </html>
    `})},lt=async(s,o="redcarpetbookings@gmail.com")=>{const m={customer:null,admin:null};if(s.customer_email){const c=pe.newBookingCustomer(s);m.customer=await ue({to:s.customer_email,subject:c.subject,html:c.html})}const n=pe.newBookingAdmin(s);return m.admin=await ue({to:o,subject:n.subject,html:n.html}),m},it=[{maxPax:60,tier:"60"},{maxPax:80,tier:"80"},{maxPax:100,tier:"100"},{maxPax:1/0,tier:"150"}],ot={"dinner plate":{60:80,80:100,100:120,150:170},"dessert plate":{60:80,80:100,100:120,150:170},"soup bowl":{60:60,80:80,100:100,150:150},"spoon & fork":{60:80,80:100,100:120,150:170},"water glass":{60:66,80:88,100:110,150:165},teaspoon:{60:40,80:40,100:40,150:80},goblet:{60:50,80:50,100:75,150:100},"serving spoon":{60:7,80:7,100:7,150:7},pitcher:{60:2,80:3,100:3,150:4},"ice bucket":{60:4,80:6,100:6,150:8},"ice tong":{60:8,80:8,100:8,150:12},"serving tray":{60:3,80:3,100:4,150:6},"lechon tray":{60:1,80:1,100:1,150:1}},dt=s=>{for(const o of it)if(s<=o.maxPax)return o.tier;return"150"},ct=(s,o=8)=>{const m=dt(s),n=Math.ceil(s/10),c=s<=80?2:s<=120?3:4,g=n+c,b=Math.ceil(s*1.1),w=Math.min(Math.max(o,6),12),k={};for(const[A,a]of Object.entries(ot))k[A]=a[m]||0;return{...k,"round table":n,"guest chair":b,"chair cover":b,"buffet table":c,"chafing dish":w,"serving tong":w,"table cloth":g,"table napkin":s,"table skirting":c}},xe=s=>({head_waiter:s>=150?2:1,service:Math.max(Math.ceil(s/10),3),extra:Math.max(Math.ceil(s/25),1),student:Math.max(Math.ceil(s/30),1)}),mt=(s,o,m)=>{const n={},c=[];return s.filter(g=>g.event_date===o&&g.id!==m&&g.status!=="cancelled").forEach(g=>{if(g.assigned_equipment)for(const[b,w]of Object.entries(g.assigned_equipment))n[b]=(n[b]||0)+w;g.assigned_staff&&g.assigned_staff.forEach(b=>{c.includes(b.id)||c.push(b.id)})}),{usedEquipment:n,busyStaffIds:c}},ut=(s,o)=>({menu470:7,menu510:9,menu560:10,menu620:11,menu680:12,cocktail:8})[s]||8;function Dt(){var de;const[s]=ze(),o=Oe(),[m,n]=p.useState([]),[c,g]=p.useState([]),[b,w]=p.useState([]),[k,A]=p.useState(!0),[a,j]=p.useState(null),[$,M]=p.useState(""),[E,i]=p.useState(s.get("status")||"all"),[y,P]=p.useState(s.get("payment")||"all"),[z,G]=p.useState(""),[I,Q]=p.useState(""),[J,ve]=p.useState("asc"),[U,je]=p.useState(!!(s.get("status")||s.get("payment"))),[D,V]=p.useState(null),[_e,X]=p.useState(!1),[K,Z]=p.useState(!1),[ee,te]=p.useState(!1);p.useEffect(()=>{se()},[]),p.useEffect(()=>{const t=s.get("booking");if(t&&m.length>0){const r=m.find(l=>l.id===t);r&&j(r)}},[m,s]);const se=async()=>{try{const[t,r,l]=await Promise.all([N.from("bookings").select("*").order("event_date",{ascending:!0}),N.from("staff").select("*").order("name"),N.from("equipment").select("*").order("category, name")]);n(t.data||[]),g(r.data||[]),w(l.data||[])}catch(t){console.error("Error:",t)}finally{A(!1)}},Ne=async(t,r)=>{const l=m.find(u=>u.id===t);if(!l||r==="completed"&&(!l.payment_status||l.payment_status==="unpaid")&&!window.confirm(`⚠️ This booking has NO payments recorded.

Are you sure you want to mark it as completed without any payment?

Tip: Record a payment first using the Payment section below.`))return;if(r==="completed"&&l.payment_status==="deposit_paid"){const u=(l.total_amount||0)-(l.amount_paid||0);if(!window.confirm(`⚠️ This booking still has a balance of ₱${u.toLocaleString()}.

Are you sure you want to mark it as completed?

The balance will still be tracked in the payment section.`))return}if(r==="cancelled"&&l.status!=="cancelled"){const x=l.amount_paid>0||l.payment_status==="deposit_paid"||l.payment_status==="fully_paid"?`⚠️ This booking has payments recorded.

Cancelling will change payment status to "Refund Pending".

Are you sure?`:"Are you sure you want to cancel this booking?";if(!window.confirm(x))return}await N.from("bookings").update({status:r}).eq("id",t);const{data:d}=await N.from("bookings").select("*").eq("id",t).single();d&&(n(u=>u.map(x=>x.id===t?d:x)),(a==null?void 0:a.id)===t&&j(d))},we=async()=>{if(a){Z(!0);try{await N.from("bookings").update({assigned_staff:a.assigned_staff,assigned_equipment:a.assigned_equipment,status:"confirmed"}).eq("id",a.id),n(t=>t.map(r=>r.id===a.id?a:r)),alert("Saved!")}catch{alert("Error saving")}finally{Z(!1)}}},Ce=(t,r)=>{if(!a)return;const l=a.assigned_staff||[],u=l.find(x=>x.id===t.id)?l.filter(x=>x.id!==t.id):[...l,{id:t.id,name:t.name,role:r,type:t.type||"regular",daily_rate:t.daily_rate||0,phone:t.phone}];j({...a,assigned_staff:u})},ae=(t,r)=>{if(!a)return;const l=a.assigned_equipment||{};if(r<=0){const{[t]:d,...u}=l;j({...a,assigned_equipment:u})}else j({...a,assigned_equipment:{...l,[t]:r}})},Se=()=>a?mt(m,a.event_date,a.id):{usedEquipment:{},busyStaffIds:[]},{usedEquipment:ne,busyStaffIds:ke}=a?Se():{usedEquipment:{},busyStaffIds:[]},L=a?m.filter(t=>t.event_date===a.event_date&&t.id!==a.id&&t.status!=="cancelled"):[],re=t=>Math.max((t.quantity||0)-(ne[t.id]||0),0),le=t=>ke.includes(t),$e=()=>{if(!a)return;const t=a.number_of_pax||60,r=ut(a.menu_package),l=xe(t),d=[];for(const[h,_]of Object.entries(l)){const S=c.filter(f=>(f.role===h||h==="extra"&&f.role==="student"||h==="student"&&f.role==="extra")&&f.available!==!1&&!le(f.id));S.sort((f,B)=>(f.type||"regular")==="regular"&&(B.type||"regular")!=="regular"?-1:(f.type||"regular")!=="regular"&&(B.type||"regular")==="regular"?1:(f.daily_rate||0)-(B.daily_rate||0)),S.slice(0,_).forEach(f=>{d.push({id:f.id,name:f.name,role:h,type:f.type||"regular",daily_rate:f.daily_rate||0,phone:f.phone})})}const u=ct(t,r),x={};b.forEach(h=>{const _=(h.name||"").toLowerCase().trim();for(const[S,f]of Object.entries(u))if(_.includes(S)||S.includes(_)||_.includes("goblet")&&S.includes("glass")||_.includes("flatware")&&(S.includes("spoon")||S.includes("fork"))){const B=re(h),me=Math.min(f,B);me>0&&(x[h.id]=me);break}}),j({...a,assigned_staff:d,assigned_equipment:x});const v=d.filter(h=>h.type==="on_call").length,C=d.filter(h=>h.type==="on_call").reduce((h,_)=>h+(_.daily_rate||0),0),ce=b.filter(h=>(h.type||"owned")==="rental"&&x[h.id]).reduce((h,_)=>h+(x[_.id]||0)*(_.rental_cost||0),0);let q=`✅ Auto-assigned for ${t} guests:

`;q+=`👥 Staff: ${d.length} total`,v>0&&(q+=` (${v} on-call = ₱${C.toLocaleString()})`),q+=`
📦 Equipment: ${Object.keys(x).length} items`,ce>0&&(q+=` (rentals = ₱${ce.toLocaleString()})`),L.length>0&&(q+=`

⚠️ ${L.length} other booking(s) on same date — availability adjusted`),q+=`

Review below and click Save when ready.`,alert(q)},ie=t=>({pending:"bg-amber-100 text-amber-700",confirmed:"bg-blue-100 text-blue-700",completed:"bg-green-100 text-green-700",cancelled:"bg-red-100 text-red-700"})[t]||"bg-gray-100 text-gray-700",Ee=t=>({unpaid:"bg-red-100 text-red-700",deposit_paid:"bg-amber-100 text-amber-700",fully_paid:"bg-green-100 text-green-700",refund_pending:"bg-orange-100 text-orange-700",refunded:"bg-gray-100 text-gray-700"})[t]||"bg-gray-100 text-gray-700",Pe=t=>({unpaid:"Unpaid",deposit_paid:"Deposit Paid",fully_paid:"Fully Paid",refund_pending:"Refund Pending",refunded:"Refunded"})[t]||"Unknown",De=()=>{se(),a&&N.from("bookings").select("*").eq("id",a.id).single().then(({data:t})=>{t&&j(t)})},qe=async()=>{var r,l;if(!a)return;if(!a.customer_email){alert("No customer email address");return}if(window.confirm(`Send booking confirmation email to ${a.customer_email}?`)){te(!0);try{const d=await lt(a);(r=d.customer)!=null&&r.success||(l=d.admin)!=null&&l.success?alert("Email sent successfully!"):alert("Failed to send email. Check console for details.")}catch(d){console.error("Email error:",d),alert("Error sending email: "+d.message)}finally{te(!1)}}},Te=()=>{if(!a)return;const t={...a,id:void 0,event_date:"",status:"pending",payment_status:"unpaid",deposit_amount:0};sessionStorage.setItem("duplicateBooking",JSON.stringify(t)),o("/book?duplicate=true")},Ae=()=>{M(""),i("all"),P("all"),G(""),Q("")},oe=[E!=="all",y!=="all",z!=="",I!==""].filter(Boolean).length,O=m.filter(t=>{var v,C,H;const r=((v=t.customer_name)==null?void 0:v.toLowerCase().includes($.toLowerCase()))||((C=t.venue)==null?void 0:C.toLowerCase().includes($.toLowerCase()))||((H=t.customer_phone)==null?void 0:H.includes($)),l=E==="all"||t.status===E,d=y==="all"||t.payment_status===y||y==="unpaid"&&!t.payment_status,u=!z||t.event_date>=z,x=!I||t.event_date<=I;return r&&l&&d&&u&&x}).sort((t,r)=>{const l=new Date(t.event_date),d=new Date(r.event_date);return J==="asc"?l-d:d-l});return k?e.jsx(Re,{rows:8,cols:5}):e.jsx("div",{className:"py-8 px-4",children:e.jsxs("div",{className:"max-w-7xl mx-auto",children:[e.jsxs("div",{className:"flex items-center justify-between mb-8",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(Be,{to:"/admin",className:"p-2 hover:bg-gray-100 rounded-lg",children:e.jsx(Qe,{size:24})}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-3xl font-bold text-gray-800",children:"Manage Bookings"}),e.jsx("p",{className:"text-gray-500",children:"Assign staff and equipment"})]})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsxs("button",{onClick:()=>Ue(O),className:"flex items-center gap-1.5 px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors",children:[e.jsx("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"none",stroke:"currentColor",strokeWidth:"2",children:e.jsx("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"})}),"Excel"]}),e.jsxs("button",{onClick:()=>Ve(O),className:"flex items-center gap-1.5 px-3 py-2 bg-red-700 text-white rounded-lg text-sm font-medium hover:bg-red-800 transition-colors",children:[e.jsx("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"none",stroke:"currentColor",strokeWidth:"2",children:e.jsx("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"})}),"PDF"]})]})]}),e.jsxs("div",{className:"grid lg:grid-cols-3 gap-6",children:[e.jsx("div",{className:"lg:col-span-1",children:e.jsxs("div",{className:"bg-white rounded-2xl shadow-lg p-4 sticky top-24",children:[e.jsxs("div",{className:"mb-4",children:[e.jsxs("div",{className:"relative mb-3",children:[e.jsx(Je,{className:"absolute left-3 top-2.5 text-gray-400",size:20}),e.jsx("input",{type:"text",placeholder:"Search name, venue, phone...",value:$,onChange:t=>M(t.target.value),className:"w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]}),e.jsxs("button",{onClick:()=>je(!U),className:"w-full flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-600 hover:bg-gray-100",children:[e.jsxs("span",{className:"flex items-center gap-2",children:[e.jsx(nt,{size:16})," Filters ",oe>0&&e.jsx("span",{className:"bg-red-700 text-white px-2 py-0.5 rounded-full text-xs",children:oe})]}),U?e.jsx(Fe,{size:16}):e.jsx(Le,{size:16})]}),U&&e.jsxs("div",{className:"mt-3 p-3 bg-gray-50 rounded-lg space-y-3",children:[e.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[e.jsxs("select",{value:E,onChange:t=>i(t.target.value),className:"px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white",children:[e.jsx("option",{value:"all",children:"All Status"}),e.jsx("option",{value:"pending",children:"Pending"}),e.jsx("option",{value:"confirmed",children:"Confirmed"}),e.jsx("option",{value:"completed",children:"Completed"}),e.jsx("option",{value:"cancelled",children:"Cancelled"})]}),e.jsxs("select",{value:y,onChange:t=>P(t.target.value),className:"px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white",children:[e.jsx("option",{value:"all",children:"All Payment"}),e.jsx("option",{value:"unpaid",children:"Unpaid"}),e.jsx("option",{value:"deposit_paid",children:"Deposit Paid"}),e.jsx("option",{value:"fully_paid",children:"Fully Paid"}),e.jsx("option",{value:"refund_pending",children:"Refund Pending"}),e.jsx("option",{value:"refunded",children:"Refunded"})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"text-xs text-gray-500 mb-1 block",children:"Date Range"}),e.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[e.jsx("input",{type:"date",value:z,onChange:t=>G(t.target.value),className:"px-3 py-2 border border-gray-200 rounded-lg text-sm",placeholder:"From"}),e.jsx("input",{type:"date",value:I,onChange:t=>Q(t.target.value),className:"px-3 py-2 border border-gray-200 rounded-lg text-sm",placeholder:"To"})]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[e.jsxs("select",{value:J,onChange:t=>ve(t.target.value),className:"px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white",children:[e.jsx("option",{value:"asc",children:"Date ↑ Soonest"}),e.jsx("option",{value:"desc",children:"Date ↓ Latest"})]}),e.jsx("button",{onClick:Ae,className:"px-3 py-2 text-red-700 border border-red-200 rounded-lg text-sm hover:bg-red-50",children:"Clear All"})]})]})]}),e.jsxs("p",{className:"text-xs text-gray-500 mb-2",children:[O.length," booking",O.length!==1?"s":""," found"]}),e.jsxs("div",{className:"space-y-2 max-h-[60vh] overflow-y-auto",children:[O.map(t=>{var r;return e.jsxs("button",{onClick:()=>j(t),className:`w-full p-3 rounded-xl text-left ${(a==null?void 0:a.id)===t.id?"bg-red-50 border-2 border-red-700":"bg-gray-50 hover:bg-gray-100 border-2 border-transparent"}`,children:[e.jsxs("div",{className:"flex justify-between items-start mb-1",children:[e.jsx("span",{className:"font-medium text-gray-800 truncate",children:t.customer_name}),e.jsxs("div",{className:"flex items-center gap-1",children:[t.status==="completed"&&(!t.payment_status||t.payment_status==="unpaid")&&e.jsx("span",{title:"Completed but unpaid",className:"text-red-500 text-xs",children:"⚠️"}),e.jsx("span",{className:`px-2 py-0.5 rounded-full text-xs font-medium ${ie(t.status)}`,children:t.status})]})]}),e.jsx("p",{className:"text-sm text-gray-500",children:t.event_date}),e.jsxs("div",{className:"flex items-center justify-between mt-1",children:[e.jsxs("span",{className:"text-sm text-gray-500",children:[t.number_of_pax," pax • ₱",(r=t.total_amount)==null?void 0:r.toLocaleString()]}),e.jsx("span",{className:`px-2 py-0.5 rounded-full text-xs font-medium ${Ee(t.payment_status)}`,children:Pe(t.payment_status)})]})]},t.id)}),O.length===0&&e.jsx("p",{className:"text-center text-gray-500 py-4",children:"No bookings found"})]})]})}),e.jsx("div",{className:"lg:col-span-2",children:a?e.jsxs("div",{className:"bg-white rounded-2xl shadow-lg overflow-hidden",children:[e.jsx("div",{className:"bg-gradient-to-r from-red-700 to-red-800 text-white p-6",children:e.jsxs("div",{className:"flex justify-between items-start",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-xl font-bold",children:a.customer_name}),e.jsxs("p",{className:"text-red-200",children:[(de=he[a.menu_package])==null?void 0:de.name," • ",a.menu_option]})]}),e.jsxs("div",{className:"flex items-center gap-2 flex-wrap justify-end",children:[e.jsxs("button",{onClick:Te,className:"bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-sm flex items-center gap-1",children:[e.jsx(at,{size:14})," Duplicate"]}),e.jsxs("button",{onClick:qe,disabled:ee,className:"bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-sm flex items-center gap-1 disabled:opacity-50",children:[e.jsx(Xe,{size:14})," ",ee?"Sending...":"Email"]}),e.jsxs("button",{onClick:()=>X(!0),className:"bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-sm flex items-center gap-1",children:[e.jsx(Ke,{size:14})," Edit"]}),e.jsxs("select",{value:a.status,onChange:t=>Ne(a.id,t.target.value),className:"bg-white/20 text-white border-0 rounded-lg px-3 py-1 text-sm",children:[e.jsx("option",{value:"pending",className:"text-gray-800",children:"Pending"}),e.jsx("option",{value:"confirmed",className:"text-gray-800",children:"Confirmed"}),e.jsx("option",{value:"completed",className:"text-gray-800",children:"Completed"}),e.jsx("option",{value:"cancelled",className:"text-gray-800",children:"Cancelled"})]})]})]})}),e.jsxs("div",{className:"p-6 space-y-6",children:[a.status==="completed"&&(!a.payment_status||a.payment_status==="unpaid")&&e.jsxs("div",{className:"bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-3",children:[e.jsx("span",{className:"text-xl",children:"⚠️"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-semibold text-red-800",children:"Completed but Unpaid"}),e.jsx("p",{className:"text-xs text-red-600",children:"This booking is marked as completed but has no payments recorded. Record a payment below."})]})]}),a.status==="completed"&&a.payment_status==="deposit_paid"&&e.jsxs("div",{className:"bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-3",children:[e.jsx("span",{className:"text-xl",children:"💰"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-semibold text-amber-800",children:"Balance Remaining"}),e.jsxs("p",{className:"text-xs text-amber-600",children:["Event completed with ₱",Math.max((a.total_amount||0)-(a.amount_paid||0),0).toLocaleString()," balance outstanding."]})]})]}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"bg-gray-50 rounded-xl p-4",children:[e.jsx("h3",{className:"font-semibold text-gray-700 mb-3",children:"Event"}),e.jsxs("div",{className:"space-y-2 text-sm",children:[e.jsxs("p",{className:"flex items-start gap-2",children:[e.jsx(Y,{size:16,className:"text-gray-400 mt-0.5"}),a.event_date," at ",a.event_time]}),e.jsxs("p",{className:"flex items-start gap-2",children:[e.jsx(be,{size:16,className:"text-gray-400 mt-0.5"}),a.venue]}),e.jsxs("p",{className:"flex items-center gap-2",children:[e.jsx(W,{size:16,className:"text-gray-400"}),a.number_of_pax," guests"]}),a.motif&&e.jsxs("p",{children:["🎨 ",a.motif]})]})]}),e.jsxs("div",{className:"bg-gray-50 rounded-xl p-4",children:[e.jsx("h3",{className:"font-semibold text-gray-700 mb-3",children:"Contact"}),e.jsxs("div",{className:"space-y-2 text-sm",children:[e.jsxs("p",{className:"flex items-center gap-2",children:[e.jsx(Ie,{size:16,className:"text-gray-400"}),a.customer_phone]}),e.jsxs("p",{className:"flex items-center gap-2",children:[e.jsx(Ze,{size:16,className:"text-gray-400"}),a.customer_email]})]})]})]}),e.jsx(He,{bookingId:a.id,totalAmount:a.total_amount||0,currentStatus:a.payment_status,onStatusChange:()=>{N.from("bookings").select("*").eq("id",a.id).single().then(({data:t})=>{t&&(j(t),n(r=>r.map(l=>l.id===t.id?t:l)))})}}),(()=>{const t=m.filter(r=>r.id!==a.id&&(r.customer_name===a.customer_name||r.customer_phone===a.customer_phone));return t.length===0?null:e.jsxs("div",{className:"bg-purple-50 rounded-xl p-4",children:[e.jsxs("h3",{className:"font-semibold text-purple-800 mb-3 flex items-center gap-2",children:[e.jsx(W,{size:18})," Customer History (",t.length," previous)"]}),e.jsx("div",{className:"space-y-2 max-h-40 overflow-y-auto",children:t.slice(0,5).map(r=>{var l;return e.jsxs("div",{className:"flex items-center justify-between p-2 bg-white rounded-lg text-sm",children:[e.jsxs("div",{children:[e.jsx("p",{className:"font-medium text-gray-800",children:r.event_date}),e.jsxs("p",{className:"text-xs text-gray-500",children:[r.venue," • ",r.number_of_pax," pax"]})]}),e.jsxs("div",{className:"text-right",children:[e.jsxs("p",{className:"font-medium text-gray-800",children:["₱",(l=r.total_amount)==null?void 0:l.toLocaleString()]}),e.jsx("span",{className:`text-xs px-2 py-0.5 rounded-full ${ie(r.status)}`,children:r.status})]})]},r.id)})}),t.length>5&&e.jsxs("p",{className:"text-xs text-purple-600 mt-2 text-center",children:["+",t.length-5," more bookings"]})]})})(),e.jsxs("div",{className:"bg-gray-50 rounded-xl p-4",children:[e.jsxs("div",{className:"flex items-center justify-between mb-3",children:[e.jsx("h3",{className:"font-semibold text-gray-700",children:"Assign Staff & Equipment"}),e.jsxs("button",{onClick:$e,className:"px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-1.5",children:["⚡ Auto-Assign (",a.number_of_pax," pax)"]})]}),L.length>0&&e.jsxs("div",{className:"bg-amber-50 border border-amber-200 rounded-lg p-2.5 mb-3 text-xs",children:[e.jsxs("p",{className:"font-medium text-amber-800",children:["📅 ",L.length," other booking(s) on ",a.event_date,":"]}),L.map(t=>e.jsxs("p",{className:"text-amber-600 ml-4",children:["• ",t.customer_name," — ",t.number_of_pax," pax (",t.status,")"]},t.id))]}),e.jsxs("div",{className:"mb-4",children:[e.jsxs("label",{className:"text-sm text-gray-500 mb-2 block font-medium",children:["👥 Staff (",(a.assigned_staff||[]).length," assigned)"]}),["head_waiter","service","extra","student"].map(t=>{const r=(a.assigned_staff||[]).filter(u=>u.role===t),l={head_waiter:"Head Waiter",service:"Service",extra:"Extra",student:"Student"},d=xe(a.number_of_pax||60)[t]||0;return d===0&&r.length===0?null:e.jsxs("div",{className:"mb-2",children:[e.jsxs("div",{className:"flex items-center justify-between mb-1",children:[e.jsxs("span",{className:"text-xs text-gray-400",children:[l[t]," (need ",d,")"]}),e.jsxs("span",{className:`text-xs font-medium ${r.length>=d?"text-green-600":"text-amber-600"}`,children:[r.length,"/",d]})]}),e.jsx("button",{onClick:()=>V(t),className:"w-full p-2.5 border-2 border-dashed border-gray-300 rounded-lg text-left hover:border-red-400 hover:bg-red-50",children:r.length>0?e.jsx("div",{className:"flex flex-wrap gap-1.5",children:r.map(u=>e.jsxs("span",{className:`px-2 py-0.5 rounded-full text-xs font-medium ${(u.type||"regular")==="on_call"?"bg-orange-100 text-orange-700":"bg-red-100 text-red-700"}`,children:[u.name," ",(u.type||"regular")==="on_call"&&"📞"]},u.id))}):e.jsxs("span",{className:"text-gray-400 text-sm",children:["+ Select ",l[t]]})})]},t)})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"text-sm text-gray-500 mb-2 block font-medium",children:"📦 Equipment"}),e.jsx("div",{className:"space-y-1.5 max-h-60 overflow-y-auto",children:b.map(t=>{const r=(a.assigned_equipment||{})[t.id]||0,l=re(t),d=(t.type||"owned")==="rental",u=ne[t.id]||0;return e.jsxs("div",{className:"flex items-center justify-between py-1.5 border-b border-gray-100",children:[e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsxs("div",{className:"flex items-center gap-1.5",children:[e.jsx("p",{className:"font-medium text-gray-800 text-sm truncate",children:t.name}),d&&e.jsx("span",{className:"px-1.5 py-0.5 bg-orange-100 text-orange-600 rounded text-[10px] font-medium shrink-0",children:"Rental"})]}),e.jsx("p",{className:"text-[11px] text-gray-400",children:d?`${t.supplier||"Supplier"} • ₱${(t.rental_cost||0).toLocaleString()}/unit`:`${l} free today${u>0?` (${u} on other events)`:""}`})]}),e.jsxs("div",{className:"flex items-center gap-1.5",children:[e.jsx("button",{onClick:()=>ae(t.id,r-1),className:"w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 text-xs",children:e.jsx(et,{size:12})}),e.jsx("span",{className:`w-7 text-center font-medium text-sm ${r>l&&!d?"text-red-600":""}`,children:r}),e.jsx("button",{onClick:()=>ae(t.id,r+1),disabled:!d&&r>=l,className:"w-7 h-7 rounded-full bg-red-700 text-white flex items-center justify-center hover:bg-red-800 disabled:opacity-30 text-xs",children:e.jsx(tt,{size:12})})]})]},t.id)})})]}),(()=>{const t=a.assigned_staff||[],r=a.assigned_equipment||{},l=t.filter(v=>(v.type||"regular")==="on_call"),d=l.reduce((v,C)=>v+(C.daily_rate||0),0),u=b.filter(v=>(v.type||"owned")==="rental"&&r[v.id]).reduce((v,C)=>v+(r[C.id]||0)*(C.rental_cost||0),0),x=d+u;return x===0?null:e.jsxs("div",{className:"bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3",children:[e.jsx("p",{className:"text-sm font-semibold text-blue-800 mb-1",children:"💰 Extra Costs"}),d>0&&e.jsxs("p",{className:"text-xs text-blue-600",children:["📞 On-Call Staff (",l.length,"): ₱",d.toLocaleString()]}),u>0&&e.jsxs("p",{className:"text-xs text-blue-600",children:["🏷️ Equipment Rental: ₱",u.toLocaleString()]}),e.jsxs("p",{className:"text-sm font-bold text-blue-800 mt-1 pt-1 border-t border-blue-200",children:["Total Additional: ₱",x.toLocaleString()]})]})})(),e.jsxs("button",{onClick:we,disabled:K,className:"w-full py-3 bg-red-700 text-white rounded-xl font-medium hover:bg-red-800 disabled:opacity-50 flex items-center justify-center gap-2",children:[e.jsx(ye,{size:20})," ",K?"Saving...":"Save Assignment"]})]})]})]}):e.jsxs("div",{className:"bg-white rounded-2xl shadow-lg p-12 text-center",children:[e.jsx("div",{className:"w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4",children:e.jsx(Y,{size:40,className:"text-gray-400"})}),e.jsx("h2",{className:"text-xl font-semibold text-gray-800 mb-2",children:"Select a Booking"}),e.jsx("p",{className:"text-gray-500",children:"Click on a booking to view and assign"})]})})]}),D&&e.jsx("div",{className:"fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4",children:e.jsxs("div",{className:"bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden",children:[e.jsxs("div",{className:"bg-red-700 text-white p-4 flex items-center justify-between",children:[e.jsxs("h3",{className:"font-semibold",children:["Select ",{head_waiter:"Head Waiter",service:"Service Staff",extra:"Extra Staff",student:"Students"}[D]||"Staff"]}),e.jsx("button",{onClick:()=>V(null),className:"p-1 hover:bg-red-800 rounded-full",children:e.jsx(fe,{size:24})})]}),e.jsx("div",{className:"overflow-y-auto max-h-[60vh]",children:c.filter(t=>D==="head_waiter"?t.role==="head_waiter":D==="service"?t.role==="service"||t.role==="extra":D==="extra"?t.role==="extra"||t.role==="student":D==="student"?t.role==="student"||t.role==="extra":!0).sort((t,r)=>(t.type||"regular")==="regular"&&(r.type||"regular")!=="regular"?-1:(t.type||"regular")!=="regular"&&(r.type||"regular")==="regular"?1:t.name.localeCompare(r.name)).map(t=>{const r=((a==null?void 0:a.assigned_staff)||[]).some(x=>x.id===t.id),l=le(t.id)&&!r,d=(t.type||"regular")==="on_call",u=!t.available||l;return e.jsxs("button",{onClick:()=>Ce(t,D),disabled:u,className:`w-full p-4 flex items-center justify-between border-b border-gray-100 ${u?"opacity-40 cursor-not-allowed":"hover:bg-red-50"} ${r?"bg-red-50":""}`,children:[e.jsxs("div",{className:"text-left",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("p",{className:"font-medium text-gray-800",children:t.name}),d&&e.jsx("span",{className:"px-1.5 py-0.5 bg-orange-100 text-orange-600 rounded text-[10px] font-medium",children:"📞 On-Call"}),!d&&e.jsx("span",{className:"px-1.5 py-0.5 bg-green-100 text-green-600 rounded text-[10px] font-medium",children:"Regular"})]}),e.jsxs("div",{className:"flex items-center gap-2 mt-0.5",children:[t.note&&e.jsx("p",{className:"text-xs text-gray-500",children:t.note}),d&&t.daily_rate>0&&e.jsxs("p",{className:"text-xs text-orange-500",children:["₱",t.daily_rate.toLocaleString(),"/day"]}),d&&t.phone&&e.jsx("p",{className:"text-xs text-gray-400",children:t.phone})]}),l&&e.jsxs("p",{className:"text-xs text-red-500 mt-0.5",children:["📅 Busy on ",a==null?void 0:a.event_date]}),!t.available&&!l&&e.jsx("p",{className:"text-xs text-red-500 mt-0.5",children:"Unavailable"})]}),r&&e.jsx(st,{size:20,className:"text-red-700"})]},t.id)})}),e.jsx("div",{className:"p-4 border-t",children:e.jsx("button",{onClick:()=>V(null),className:"w-full py-2 bg-red-700 text-white rounded-lg font-medium",children:"Done"})})]})}),_e&&a&&e.jsx(rt,{booking:a,onClose:()=>X(!1),onSave:De})]})})}export{Dt as default};
