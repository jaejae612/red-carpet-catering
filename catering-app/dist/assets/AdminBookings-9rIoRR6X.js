import{h as V,r as x,m as De,j as e,X as Te,g as et,f as te,k as se,s as N,i as tt,d as st,L as at,C as Ce,b as $e,P as nt}from"./index-B3CN_A2s.js";import{T as rt}from"./SkeletonLoaders-yG1Gzoh4.js";import{e as lt,a as it,P as ot}from"./PaymentTracker-Ck0ivvGo.js";import{A as dt}from"./alert-circle-48q-zgOp.js";import{C as ct,M as Me}from"./map-pin-visA-dUF.js";import{C as mt}from"./credit-card-C7MxLem7.js";import{S as ae}from"./save-CK67jyGY.js";import{A as ut}from"./arrow-left-BRe6h_9R.js";import{S as ke}from"./search-DnoiD1Vn.js";import{S as pt}from"./send-Db0fn-is.js";import{P as xt}from"./pen-CvbCJ3IN.js";import{T as gt}from"./trash-2-Dwt6RjAd.js";import{M as ht}from"./mail-DP8zcXG5.js";import{S as Ee}from"./star-vEJpuTbY.js";import{M as ft}from"./minus-HEZOJzFy.js";import{P as bt}from"./plus-C0ogG6sP.js";import{C as yt}from"./check-xm8kJSSh.js";import"./alert-triangle-DrukLfTj.js";const vt=V("Bell",[["path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",key:"1qo2s2"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}]]),jt=V("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]),_t=V("DollarSign",[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]]),Nt=V("Filter",[["polygon",{points:"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3",key:"1yg77f"}]]);function wt({booking:s,onClose:i,onSave:d}){var T;const[n,m]=x.useState({customer_name:"",customer_phone:"",customer_email:"",venue:"",event_date:"",event_time:"",number_of_pax:60,motif:"",special_requests:"",status:"pending",payment_status:"unpaid",deposit_amount:0,payment_notes:"",total_amount:0}),[h,y]=x.useState(!1),[$,P]=x.useState(""),[A,a]=x.useState("");x.useEffect(()=>{s&&m({customer_name:s.customer_name||"",customer_phone:s.customer_phone||"",customer_email:s.customer_email||"",venue:s.venue||"",event_date:s.event_date||"",event_time:s.event_time||"",number_of_pax:s.number_of_pax||60,motif:s.motif||"",special_requests:s.special_requests||"",status:s.status||"pending",payment_status:s.payment_status||"unpaid",deposit_amount:s.deposit_amount||0,payment_notes:s.payment_notes||"",total_amount:s.total_amount||0})},[s]);const v=async c=>{c.preventDefault(),y(!0),P(""),a("");try{const _={customer_name:n.customer_name,customer_phone:n.customer_phone,customer_email:n.customer_email,venue:n.venue,event_date:n.event_date,event_time:n.event_time,number_of_pax:n.number_of_pax,motif:n.motif,special_requests:n.special_requests,status:n.status,payment_status:n.payment_status,deposit_amount:n.deposit_amount,payment_notes:n.payment_notes,total_amount:n.total_amount};n.payment_status==="deposit_paid"&&!s.deposit_paid_at&&(_.deposit_paid_at=new Date().toISOString()),n.payment_status==="fully_paid"&&!s.balance_paid_at&&(_.balance_paid_at=new Date().toISOString());const{error:M}=await N.from("bookings").update(_).eq("id",s.id);if(M)throw M;a("Booking updated successfully!"),setTimeout(()=>{d==null||d(),i()},1e3)}catch(_){P(_.message||"Failed to update booking")}finally{y(!1)}},D=[];for(let c=6;c<=22;c++)["00","30"].forEach(_=>{const M=c>12?c-12:c===0?12:c,R=c>=12?"PM":"AM";D.push({value:`${c.toString().padStart(2,"0")}:${_}`,label:`${M}:${_} ${R}`})});const z=De[s==null?void 0:s.menu_package];return e.jsx("div",{className:"fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto",children:e.jsxs("div",{className:"bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto",children:[e.jsxs("div",{className:"flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-xl font-bold text-gray-800",children:"Edit Booking"}),e.jsxs("p",{className:"text-sm text-gray-500",children:["#",(T=s==null?void 0:s.id)==null?void 0:T.slice(0,8)," • ",z==null?void 0:z.name]})]}),e.jsx("button",{onClick:i,className:"p-2 hover:bg-gray-100 rounded-lg",children:e.jsx(Te,{size:20})})]}),e.jsxs("form",{onSubmit:v,className:"p-6 space-y-6",children:[$&&e.jsxs("div",{className:"bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2",children:[e.jsx(dt,{size:20}),$]}),A&&e.jsxs("div",{className:"bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2",children:[e.jsx(et,{size:20}),A]}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-semibold text-gray-800 mb-3",children:"Customer Information"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Name"}),e.jsx("input",{type:"text",value:n.customer_name,onChange:c=>m({...n,customer_name:c.target.value}),className:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Phone"}),e.jsx("input",{type:"tel",value:n.customer_phone,onChange:c=>m({...n,customer_phone:c.target.value}),className:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]}),e.jsxs("div",{className:"md:col-span-2",children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Email"}),e.jsx("input",{type:"email",value:n.customer_email,onChange:c=>m({...n,customer_email:c.target.value}),className:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]})]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-semibold text-gray-800 mb-3",children:"Event Details"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Event Date"}),e.jsxs("div",{className:"relative",children:[e.jsx(te,{className:"absolute left-3 top-2.5 text-gray-400",size:18}),e.jsx("input",{type:"date",value:n.event_date,onChange:c=>m({...n,event_date:c.target.value}),className:"w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Event Time"}),e.jsxs("div",{className:"relative",children:[e.jsx(ct,{className:"absolute left-3 top-2.5 text-gray-400",size:18}),e.jsx("select",{value:n.event_time,onChange:c=>m({...n,event_time:c.target.value}),className:"w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none bg-white",children:D.map(c=>e.jsx("option",{value:c.value,children:c.label},c.value))})]})]}),e.jsxs("div",{className:"md:col-span-2",children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Venue"}),e.jsxs("div",{className:"relative",children:[e.jsx(Me,{className:"absolute left-3 top-2.5 text-gray-400",size:18}),e.jsx("input",{type:"text",value:n.venue,onChange:c=>m({...n,venue:c.target.value}),className:"w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Number of Guests"}),e.jsxs("div",{className:"relative",children:[e.jsx(se,{className:"absolute left-3 top-2.5 text-gray-400",size:18}),e.jsx("input",{type:"number",min:"30",value:n.number_of_pax,onChange:c=>m({...n,number_of_pax:parseInt(c.target.value)}),className:"w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Total Amount (₱)"}),e.jsx("input",{type:"number",value:n.total_amount,onChange:c=>m({...n,total_amount:parseInt(c.target.value)}),className:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]})]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-semibold text-gray-800 mb-3",children:"Status & Payment"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Booking Status"}),e.jsxs("select",{value:n.status,onChange:c=>m({...n,status:c.target.value}),className:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none bg-white",children:[e.jsx("option",{value:"pending",children:"Pending"}),e.jsx("option",{value:"confirmed",children:"Confirmed"}),e.jsx("option",{value:"completed",children:"Completed"}),e.jsx("option",{value:"cancelled",children:"Cancelled"})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Payment Status"}),e.jsxs("div",{className:"relative",children:[e.jsx(mt,{className:"absolute left-3 top-2.5 text-gray-400",size:18}),e.jsxs("select",{value:n.payment_status,onChange:c=>m({...n,payment_status:c.target.value}),className:"w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none bg-white",children:[e.jsx("option",{value:"unpaid",children:"Unpaid"}),e.jsx("option",{value:"deposit_paid",children:"Deposit Paid"}),e.jsx("option",{value:"fully_paid",children:"Fully Paid"}),e.jsx("option",{value:"refunded",children:"Refunded"})]})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Deposit Amount (₱)"}),e.jsx("input",{type:"number",value:n.deposit_amount,onChange:c=>m({...n,deposit_amount:parseInt(c.target.value)||0}),className:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Balance Due"}),e.jsxs("div",{className:"px-4 py-2 bg-gray-100 rounded-lg font-semibold text-red-700",children:["₱",(n.total_amount-n.deposit_amount).toLocaleString()]})]})]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-semibold text-gray-800 mb-3",children:"Other Details"}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Motif/Theme"}),e.jsx("input",{type:"text",value:n.motif,onChange:c=>m({...n,motif:c.target.value}),className:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Special Requests"}),e.jsx("textarea",{value:n.special_requests,onChange:c=>m({...n,special_requests:c.target.value}),rows:2,className:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Payment Notes"}),e.jsx("textarea",{value:n.payment_notes,onChange:c=>m({...n,payment_notes:c.target.value}),rows:2,placeholder:"e.g., GCash payment received, reference #12345",className:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]})]})]}),e.jsxs("div",{className:"flex gap-3 pt-4 border-t",children:[e.jsxs("button",{type:"submit",disabled:h,className:"flex-1 bg-red-700 text-white py-3 rounded-xl font-medium hover:bg-red-800 disabled:opacity-50 flex items-center justify-center gap-2",children:[e.jsx(ae,{size:18})," ",h?"Saving...":"Save Changes"]}),e.jsx("button",{type:"button",onClick:i,className:"px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50",children:"Cancel"})]})]})]})})}const ne=async({to:s,subject:i,html:d})=>{if(!s||!i||!d)return{success:!1,error:"Missing required fields"};try{const{data:{session:n}}=await N.auth.getSession(),m=await fetch("https://uitplgqukaxrribgrpvv.supabase.co/functions/v1/send-email",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${(n==null?void 0:n.access_token)||""}`},body:JSON.stringify({to:s,subject:i,html:d})}),h=await m.json();return m.ok?{success:!0,data:h}:(console.error("Email error:",h),{success:!1,error:h.error||"Failed to send email"})}catch(n){return console.error("Email error:",n),{success:!1,error:n.message}}},S=s=>`₱${(s==null?void 0:s.toLocaleString())||0}`,E=s=>s?new Date(s).toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}):"",U=s=>{if(!s)return"";const[i,d]=s.split(":"),n=parseInt(i),m=n>=12?"PM":"AM";return`${n>12?n-12:n===0?12:n}:${d} ${m}`},re={newBookingCustomer:s=>{var i,d;return{subject:`Booking Confirmed - Red Carpet Catering #${(i=s.id)==null?void 0:i.slice(0,8)}`,html:`
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
                <span>#${(d=s.id)==null?void 0:d.slice(0,8).toUpperCase()}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Event Date:</span>
                <span>${E(s.event_date)}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Event Time:</span>
                <span>${U(s.event_time)}</span>
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
                Total: ${S(s.total_amount)}
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
    `}},newBookingAdmin:s=>({subject:`🔔 New Booking Received - ${s.customer_name} - ${E(s.event_date)}`,html:`
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
              <div class="detail-row"><span class="label">📅 Date:</span> ${E(s.event_date)}</div>
              <div class="detail-row"><span class="label">🕐 Time:</span> ${U(s.event_time)}</div>
              <div class="detail-row"><span class="label">📍 Venue:</span> ${s.venue}</div>
              <div class="detail-row"><span class="label">🍽️ Package:</span> ${s.menu_package}</div>
              <div class="detail-row"><span class="label">👥 Guests:</span> ${s.number_of_pax} pax</div>
              <div class="detail-row"><span class="label">📞 Phone:</span> ${s.customer_phone}</div>
              <div class="detail-row"><span class="label">📧 Email:</span> ${s.customer_email||"N/A"}</div>
              ${s.motif?`<div class="detail-row"><span class="label">🎨 Motif:</span> ${s.motif}</div>`:""}
              ${s.special_requests?`<div class="detail-row"><span class="label">📝 Notes:</span> ${s.special_requests}</div>`:""}
              <div class="total">Total: ${S(s.total_amount)}</div>
            </div>
            <p style="text-align: center;">
              <a href="https://ceburedcarpetcatering.com/admin/bookings" class="btn">View in Admin Panel</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `}),newFoodOrderCustomer:s=>{var i,d,n;return{subject:`Order Confirmed - Red Carpet Catering #${(i=s.id)==null?void 0:i.slice(0,8)}`,html:`
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
              <p><strong>Order ID:</strong> #${(d=s.id)==null?void 0:d.slice(0,8).toUpperCase()}</p>
              <p><strong>Delivery Date:</strong> ${E(s.delivery_date)}</p>
              <p><strong>Delivery Time:</strong> ${U(s.delivery_time)||"To be confirmed"}</p>
              <p><strong>Delivery Address:</strong> ${s.delivery_address}</p>
              
              <h4 style="margin-top: 20px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Order Items</h4>
              ${((n=s.items)==null?void 0:n.map(m=>`
                <div class="item">
                  <span>${m.name} × ${m.quantity}</span>
                  <span>${S(m.price*m.quantity)}</span>
                </div>
              `).join(""))||""}
              
              <div class="total">
                Total: ${S(s.total_amount)}
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
    `}},newFoodOrderAdmin:s=>{var i;return{subject:`🛒 New Food Order - ${s.customer_name} - ${E(s.delivery_date)}`,html:`
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
              <p><strong>📅 Delivery:</strong> ${E(s.delivery_date)} ${s.delivery_time?`at ${U(s.delivery_time)}`:""}</p>
              <p><strong>📍 Address:</strong> ${s.delivery_address}</p>
              <p><strong>📞 Phone:</strong> ${s.customer_phone}</p>
              
              <h4>Items:</h4>
              ${((i=s.items)==null?void 0:i.map(d=>`
                <div class="item">${d.name} × ${d.quantity} - ${S(d.price*d.quantity)}</div>
              `).join(""))||""}
              
              <div class="total">Total: ${S(s.total_amount)}</div>
            </div>
            <p style="text-align: center;">
              <a href="https://ceburedcarpetcatering.com/admin/food-orders" class="btn">View in Admin Panel</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `}},eventReminder:(s,i)=>({subject:`Reminder: Your Event is in ${i} Day${i!==1?"s":""} - Red Carpet Catering`,html:`
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
            <p>Dear <strong>${s.customer_name}</strong>,</p>
            <p>This is a friendly reminder about your upcoming event:</p>

            <div class="countdown">${i} day${i!==1?"s":""} to go!</div>

            <div class="booking-details">
              <div class="detail-row"><span class="detail-label">Event Date:</span> ${E(s.event_date)}</div>
              <div class="detail-row"><span class="detail-label">Time:</span> ${U(s.event_time)}</div>
              <div class="detail-row"><span class="detail-label">Venue:</span> ${s.venue}</div>
              <div class="detail-row"><span class="detail-label">Guests:</span> ${s.number_of_pax} pax</div>
              <div class="detail-row"><span class="detail-label">Package:</span> ${s.menu_package}</div>
              <div class="detail-row"><span class="detail-label">Total:</span> ${S(s.total_amount)}</div>
              ${s.payment_status!=="fully_paid"?`
              <div class="detail-row" style="color: #dc2626;">
                <span class="detail-label">Payment Status:</span> ${s.payment_status==="deposit_paid"?"Deposit Paid - Balance Due":"Payment Pending"}
              </div>`:""}
            </div>

            ${s.payment_status!=="fully_paid"?"<p><strong>Please ensure your payment is settled before the event.</strong></p>":""}
            <p>If you have any questions or changes, please contact us as soon as possible.</p>
          </div>
          <div class="footer">
            <p><strong>Red Carpet Food and Catering Services</strong></p>
            <p>0917-187-6510 | 0926-664-2839 | (032) 383-4122</p>
          </div>
        </div>
      </body>
      </html>
    `}),bookingStatusUpdate:(s,i)=>({subject:`Booking ${i.charAt(0).toUpperCase()+i.slice(1)} - Red Carpet Catering`,html:`
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: ${i==="confirmed"?"#059669":i==="cancelled"?"#dc2626":"#b91c1c"}; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
          .status-badge { display: inline-block; padding: 8px 20px; border-radius: 20px; font-weight: bold; background: ${i==="confirmed"?"#d1fae5":i==="cancelled"?"#fee2e2":"#fef3c7"}; color: ${i==="confirmed"?"#059669":i==="cancelled"?"#dc2626":"#d97706"}; }
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
              <span class="status-badge">${i.toUpperCase()}</span>
            </p>
            <p><strong>Booking Details:</strong></p>
            <ul>
              <li>Event Date: ${E(s.event_date)}</li>
              <li>Venue: ${s.venue}</li>
              <li>Guests: ${s.number_of_pax} pax</li>
            </ul>
            ${i==="confirmed"?"<p>We look forward to serving you!</p>":""}
            ${i==="cancelled"?"<p>If you have any questions, please contact us.</p>":""}
          </div>
          <div class="footer">
            <p><strong>Red Carpet Food and Catering Services</strong></p>
            <p>📞 0917-187-6510 | 0926-664-2839 | (032) 383-4122</p>
          </div>
        </div>
      </body>
      </html>
    `})},St=async(s,i="redcarpetbookings@gmail.com")=>{const d={customer:null,admin:null};if(s.customer_email){const m=re.newBookingCustomer(s);d.customer=await ne({to:s.customer_email,subject:m.subject,html:m.html})}const n=re.newBookingAdmin(s);return d.admin=await ne({to:i,subject:n.subject,html:n.html}),d},Ct=async s=>{if(!s.customer_email)return{success:!1,error:"No customer email"};const i=Math.ceil((new Date(s.event_date)-new Date)/(1e3*60*60*24)),d=re.eventReminder(s,Math.max(i,0));return await ne({to:s.customer_email,subject:d.subject,html:d.html})},$t=async({to:s,message:i})=>{if(!s||!i)return{success:!1,error:"Missing phone number or message"};const d=s.replace(/[\s\-()]/g,"");try{const{data:{session:n}}=await N.auth.getSession(),m=await fetch(`${N.supabaseUrl}/functions/v1/send-sms`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${(n==null?void 0:n.access_token)||""}`},body:JSON.stringify({to:d,message:i})}),h=await m.json();return m.ok?{success:!0,data:h}:(console.error("SMS error:",h),{success:!1,error:h.error||"Failed to send SMS"})}catch(n){return console.error("SMS error:",n),{success:!1,error:n.message}}},kt={bookingReminder:s=>`[Red Carpet Catering] Reminder: Your event is in ${Math.ceil((new Date(s.event_date)-new Date)/864e5)} day(s) on ${s.event_date} at ${s.venue}. ${s.number_of_pax} pax - ${S(s.total_amount)}. For questions call 0917-187-6510.`,bookingConfirmation:s=>{var i;return`[Red Carpet Catering] Booking confirmed! ${s.event_date} at ${s.venue}, ${s.number_of_pax} pax. Total: ${S(s.total_amount)}. Ref: #${(i=s.id)==null?void 0:i.slice(0,8).toUpperCase()}`},paymentReceived:(s,i)=>{var d;return`[Red Carpet Catering] Payment of ${S(i)} received for booking #${(d=s.id)==null?void 0:d.slice(0,8).toUpperCase()}. Thank you!`},foodOrderUpdate:(s,i)=>{var n;return`[Red Carpet Catering] ${{confirmed:"Your order has been confirmed",preparing:"Your order is being prepared",ready:"Your order is ready for pickup/delivery",delivered:"Your order has been delivered"}[i]||`Order status: ${i}`}. Order #${(n=s.id)==null?void 0:n.slice(0,8).toUpperCase()}. Total: ${S(s.total_amount)}`}},Et=async s=>s.customer_phone?await $t({to:s.customer_phone,message:kt.bookingReminder(s)}):{success:!1,error:"No phone number"},Pt=[{maxPax:60,tier:"60"},{maxPax:80,tier:"80"},{maxPax:100,tier:"100"},{maxPax:1/0,tier:"150"}],Dt={"dinner plate":{60:80,80:100,100:120,150:170},"dessert plate":{60:80,80:100,100:120,150:170},"soup bowl":{60:60,80:80,100:100,150:150},"spoon & fork":{60:80,80:100,100:120,150:170},"water glass":{60:66,80:88,100:110,150:165},teaspoon:{60:40,80:40,100:40,150:80},goblet:{60:50,80:50,100:75,150:100},"serving spoon":{60:7,80:7,100:7,150:7},pitcher:{60:2,80:3,100:3,150:4},"ice bucket":{60:4,80:6,100:6,150:8},"ice tong":{60:8,80:8,100:8,150:12},"serving tray":{60:3,80:3,100:4,150:6},"lechon tray":{60:1,80:1,100:1,150:1}},Tt=s=>{for(const i of Pt)if(s<=i.maxPax)return i.tier;return"150"},Mt=(s,i=8)=>{s=Math.max(s||0,30);const d=Tt(s),n=Math.ceil(s/10),m=s<=80?2:s<=120?3:4,h=n+m,y=Math.ceil(s*1.1),$=Math.min(Math.max(i,6),12),P={};for(const[A,a]of Object.entries(Dt))P[A]=a[d]||0;return{...P,"round table":n,"guest chair":y,"chair cover":y,"buffet table":m,"chafing dish":$,"serving tong":$,"table cloth":h,"table napkin":s,"table skirting":m}},Pe=s=>(s=Math.max(s||0,30),{head_waiter:s>=150?2:1,service:Math.max(Math.ceil(s/10),3),extra:Math.max(Math.ceil(s/25),1),student:Math.max(Math.ceil(s/30),1)}),qt=(s,i,d)=>{const n={},m=[];return s.filter(h=>h.event_date===i&&h.id!==d&&h.status!=="cancelled").forEach(h=>{if(h.assigned_equipment)for(const[y,$]of Object.entries(h.assigned_equipment))n[y]=(n[y]||0)+$;h.assigned_staff&&h.assigned_staff.forEach(y=>{m.includes(y.id)||m.push(y.id)})}),{usedEquipment:n,busyStaffIds:m}},At=(s,i)=>{if(i){let n=0;if(Array.isArray(i.menu_items)&&(n+=i.menu_items.length),Array.isArray(i.custom_dishes)&&(n+=i.custom_dishes.length),n>0)return Math.max(n,6)}return{menu470:7,menu510:9,menu560:10,menu620:11,menu660:11,menu680:12,menu810:12,cocktail:8}[s]||8};function es(){var Se;const[s]=tt(),i=st(),[d,n]=x.useState([]),[m,h]=x.useState([]),[y,$]=x.useState([]),[P,A]=x.useState(!0),[a,v]=x.useState(null),[D,z]=x.useState(""),[T,c]=x.useState(s.get("status")||"all"),[_,M]=x.useState(s.get("payment")||"all"),[R,le]=x.useState(""),[Y,ie]=x.useState(""),[oe,qe]=x.useState("asc"),[W,Ae]=x.useState(!!(s.get("status")||s.get("payment"))),[q,G]=x.useState(null),[ze,de]=x.useState(!1),[ce,me]=x.useState(!1),[ue,pe]=x.useState(!1),[xe,ge]=x.useState(!1),[he,fe]=x.useState(!1),[J,F]=x.useState(!1),[Q,K]=x.useState(""),[X,Re]=x.useState(!1);x.useEffect(()=>{be()},[]),x.useEffect(()=>{const t=s.get("booking");if(t&&d.length>0){const r=d.find(l=>l.id===t);r&&v(r)}},[d,s]);const be=async()=>{try{const[t,r,l]=await Promise.all([N.from("bookings").select("*").order("event_date",{ascending:!0}),N.from("staff").select("*").order("name"),N.from("equipment").select("*").order("category, name")]);n(t.data||[]),h(r.data||[]),$(l.data||[])}catch(t){console.error("Error:",t)}finally{A(!1)}},Oe=async(t,r)=>{const l=d.find(u=>u.id===t);if(!l||r==="completed"&&(!l.payment_status||l.payment_status==="unpaid")&&!window.confirm(`⚠️ This booking has NO payments recorded.

Are you sure you want to mark it as completed without any payment?

Tip: Record a payment first using the Payment section below.`))return;if(r==="completed"&&l.payment_status==="deposit_paid"){const u=(l.total_amount||0)-(l.amount_paid||0);if(!window.confirm(`⚠️ This booking still has a balance of ₱${u.toLocaleString()}.

Are you sure you want to mark it as completed?

The balance will still be tracked in the payment section.`))return}if(r==="cancelled"&&l.status!=="cancelled"){const p=l.amount_paid>0||l.payment_status==="deposit_paid"||l.payment_status==="fully_paid"?`⚠️ This booking has payments recorded.

Cancelling will change payment status to "Refund Pending".

Are you sure?`:"Are you sure you want to cancel this booking?";if(!window.confirm(p))return}await N.from("bookings").update({status:r}).eq("id",t);const{data:o}=await N.from("bookings").select("*").eq("id",t).single();o&&(n(u=>u.map(p=>p.id===t?o:p)),(a==null?void 0:a.id)===t&&v(o))},Be=async()=>{if(a){me(!0);try{const t={assigned_staff:a.assigned_staff,assigned_equipment:a.assigned_equipment};a.status==="pending"&&(t.status="confirmed"),await N.from("bookings").update(t).eq("id",a.id),a.status==="pending"&&(a.status="confirmed"),n(r=>r.map(l=>l.id===a.id?a:l)),F(!1),alert("Saved!")}catch{alert("Error saving")}finally{me(!1)}}},Fe=(t,r)=>{if(!a)return;const l=a.assigned_staff||[],u=l.find(p=>p.id===t.id)?l.filter(p=>p.id!==t.id):[...l,{id:t.id,name:t.name,role:r,type:t.type||"regular",daily_rate:t.daily_rate||0,phone:t.phone}];v({...a,assigned_staff:u}),F(!0)},ye=(t,r)=>{if(!a)return;const l=a.assigned_equipment||{};if(r<=0){const{[t]:o,...u}=l;v({...a,assigned_equipment:u})}else v({...a,assigned_equipment:{...l,[t]:r}});F(!0)},Le=()=>a?qt(d,a.event_date,a.id):{usedEquipment:{},busyStaffIds:[]},{usedEquipment:ve,busyStaffIds:Ie}=a?Le():{usedEquipment:{},busyStaffIds:[]},L=a?d.filter(t=>t.event_date===a.event_date&&t.id!==a.id&&t.status!=="cancelled"):[],je=t=>Math.max((t.quantity||0)-(ve[t.id]||0),0),_e=t=>Ie.includes(t),Ue=()=>{if(!a)return;const t=a.number_of_pax||60,r=At(a.menu_package,a),l=Pe(t),o=[];for(const[g,j]of Object.entries(l)){const C=m.filter(f=>(f.role===g||g==="extra"&&f.role==="student"||g==="student"&&f.role==="extra")&&f.available!==!1&&!_e(f.id));C.sort((f,B)=>(f.type||"regular")==="regular"&&(B.type||"regular")!=="regular"?-1:(f.type||"regular")!=="regular"&&(B.type||"regular")==="regular"?1:(f.daily_rate||0)-(B.daily_rate||0)),C.slice(0,j).forEach(f=>{o.push({id:f.id,name:f.name,role:g,type:f.type||"regular",daily_rate:f.daily_rate||0,phone:f.phone})})}const u=Mt(t,r),p={};y.forEach(g=>{const j=(g.name||"").toLowerCase().trim();if(u[j]!==void 0){const C=je(g),f=Math.min(u[j],C);f>0&&(p[g.id]=f)}}),v({...a,assigned_staff:o,assigned_equipment:p}),F(!0);const b=o.filter(g=>g.type==="on_call").length,w=o.filter(g=>g.type==="on_call").reduce((g,j)=>g+(j.daily_rate||0),0),H=y.filter(g=>(g.type||"owned")==="rental"&&p[g.id]).reduce((g,j)=>g+(p[j.id]||0)*(j.rental_cost||0),0),Ze={head_waiter:"Head Waiter",service:"Service",extra:"Extra",student:"Student"},Z=[];for(const[g,j]of Object.entries(l)){const C=o.filter(f=>f.role===g).length;C<j&&Z.push(`${Ze[g]}: ${C}/${j}`)}const ee=[];for(const[g,j]of Object.entries(u)){const C=y.find(B=>(B.name||"").toLowerCase().trim()===g),f=C&&p[C.id]||0;f<j&&ee.push(`${g}: ${f}/${j}`)}let k=`✅ Auto-assigned for ${t} guests:

`;k+=`👥 Staff: ${o.length} total`,b>0&&(k+=` (${b} on-call = ₱${w.toLocaleString()})`),k+=`
📦 Equipment: ${Object.keys(p).length} items`,H>0&&(k+=` (rentals = ₱${H.toLocaleString()})`),Z.length>0&&(k+=`

⚠️ Staff shortages:
${Z.join(`
`)}`),ee.length>0&&(k+=`

⚠️ Equipment shortages:
${ee.join(`
`)}`),L.length>0&&(k+=`

📅 ${L.length} other booking(s) on same date — availability adjusted`),k+=`

Review below and click Save when ready.`,alert(k)},Ne=t=>({pending:"bg-amber-100 text-amber-700",confirmed:"bg-blue-100 text-blue-700",completed:"bg-green-100 text-green-700",cancelled:"bg-red-100 text-red-700"})[t]||"bg-gray-100 text-gray-700",Ye=t=>({unpaid:"bg-red-100 text-red-700",deposit_paid:"bg-amber-100 text-amber-700",fully_paid:"bg-green-100 text-green-700",refund_pending:"bg-orange-100 text-orange-700",refunded:"bg-gray-100 text-gray-700"})[t]||"bg-gray-100 text-gray-700",He=t=>({unpaid:"Unpaid",deposit_paid:"Deposit Paid",fully_paid:"Fully Paid",refund_pending:"Refund Pending",refunded:"Refunded"})[t]||"Unknown",Ve=()=>{be(),a&&N.from("bookings").select("*").eq("id",a.id).single().then(({data:t})=>{t&&v(t)})},We=async()=>{var r,l;if(!a)return;if(!a.customer_email){alert("No customer email address");return}if(window.confirm(`Send booking confirmation email to ${a.customer_email}?`)){pe(!0);try{const o=await St(a);(r=o.customer)!=null&&r.success||(l=o.admin)!=null&&l.success?alert("Email sent successfully!"):alert("Failed to send email. Check console for details.")}catch(o){console.error("Email error:",o),alert("Error sending email: "+o.message)}finally{pe(!1)}}},Ge=()=>{if(!a)return;const t={...a,id:void 0,event_date:"",status:"pending",payment_status:"unpaid",deposit_amount:0};sessionStorage.setItem("duplicateBooking",JSON.stringify(t)),i("/book?duplicate=true")},Je=async()=>{if(!a)return;if(Math.ceil((new Date(a.event_date)-new Date)/(1e3*60*60*24))<0){alert("This event has already passed.");return}if((a.customer_email&&window.confirm(`Send reminder via:

OK = Email (${a.customer_email})
Cancel = SMS (${a.customer_phone})`)?"email":"sms")==="email"){ge(!0);try{const l=await Ct(a);alert(l.success?`Reminder sent to ${a.customer_email}!`:"Failed: "+l.error)}catch(l){alert("Error: "+l.message)}finally{ge(!1)}}else{if(!a.customer_phone){alert("No phone number");return}fe(!0);try{const l=await Et(a);alert(l.success?`SMS sent to ${a.customer_phone}!`:"Failed: "+l.error)}catch(l){alert("Error: "+l.message)}finally{fe(!1)}}},Qe=async t=>{if(!a)return;await N.from("bookings").update({expenses:t}).eq("id",a.id);const r={...a,expenses:t};v(r),n(l=>l.map(o=>o.id===r.id?r:o))},Ke=async()=>{if(!a)return;const r=(a.amount_paid||0)>0?`⚠️ "${a.customer_name}" has ₱${a.amount_paid.toLocaleString()} in payments.

This will permanently delete the booking and all payment records.

Are you sure?`:`Delete booking for "${a.customer_name}" on ${a.event_date}?

This action cannot be undone.`;if(!window.confirm(r))return;const{error:l}=await N.from("bookings").delete().eq("id",a.id);l?alert("Error deleting booking: "+l.message):(n(o=>o.filter(u=>u.id!==a.id)),v(null))},Xe=()=>{z(""),c("all"),M("all"),le(""),ie("")},we=[T!=="all",_!=="all",R!=="",Y!==""].filter(Boolean).length,O=d.filter(t=>{var b,w,I;const r=((b=t.customer_name)==null?void 0:b.toLowerCase().includes(D.toLowerCase()))||((w=t.venue)==null?void 0:w.toLowerCase().includes(D.toLowerCase()))||((I=t.customer_phone)==null?void 0:I.includes(D)),l=T==="all"||t.status===T,o=_==="all"||t.payment_status===_||_==="unpaid"&&!t.payment_status,u=!R||t.event_date>=R,p=!Y||t.event_date<=Y;return r&&l&&o&&u&&p}).sort((t,r)=>{const l=new Date(t.event_date),o=new Date(r.event_date);return oe==="asc"?l-o:o-l});return P?e.jsx(rt,{rows:8,cols:5}):e.jsx("div",{className:"py-8 px-4",children:e.jsxs("div",{className:"max-w-7xl mx-auto",children:[e.jsxs("div",{className:"flex items-center justify-between mb-8",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(at,{to:"/admin",className:"p-2 hover:bg-gray-100 rounded-lg",children:e.jsx(ut,{size:24})}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-3xl font-bold text-gray-800",children:"Manage Bookings"}),e.jsx("p",{className:"text-gray-500",children:"Assign staff and equipment"})]})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsxs("button",{onClick:()=>lt(O),className:"flex items-center gap-1.5 px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors",children:[e.jsx("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"none",stroke:"currentColor",strokeWidth:"2",children:e.jsx("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"})}),"Excel"]}),e.jsxs("button",{onClick:()=>it(O),className:"flex items-center gap-1.5 px-3 py-2 bg-red-700 text-white rounded-lg text-sm font-medium hover:bg-red-800 transition-colors",children:[e.jsx("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"none",stroke:"currentColor",strokeWidth:"2",children:e.jsx("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"})}),"PDF"]})]})]}),e.jsxs("div",{className:"grid lg:grid-cols-3 gap-6",children:[e.jsx("div",{className:"lg:col-span-1",children:e.jsxs("div",{className:"bg-white rounded-2xl shadow-lg p-4 sticky top-24",children:[e.jsxs("div",{className:"mb-4",children:[e.jsxs("div",{className:"relative mb-3",children:[e.jsx(ke,{className:"absolute left-3 top-2.5 text-gray-400",size:20}),e.jsx("input",{type:"text",placeholder:"Search name, venue, phone...",value:D,onChange:t=>z(t.target.value),className:"w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"})]}),e.jsxs("button",{onClick:()=>Ae(!W),className:"w-full flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-600 hover:bg-gray-100",children:[e.jsxs("span",{className:"flex items-center gap-2",children:[e.jsx(Nt,{size:16})," Filters ",we>0&&e.jsx("span",{className:"bg-red-700 text-white px-2 py-0.5 rounded-full text-xs",children:we})]}),W?e.jsx(Ce,{size:16}):e.jsx($e,{size:16})]}),W&&e.jsxs("div",{className:"mt-3 p-3 bg-gray-50 rounded-lg space-y-3",children:[e.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[e.jsxs("select",{value:T,onChange:t=>c(t.target.value),className:"px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white",children:[e.jsx("option",{value:"all",children:"All Status"}),e.jsx("option",{value:"pending",children:"Pending"}),e.jsx("option",{value:"confirmed",children:"Confirmed"}),e.jsx("option",{value:"completed",children:"Completed"}),e.jsx("option",{value:"cancelled",children:"Cancelled"})]}),e.jsxs("select",{value:_,onChange:t=>M(t.target.value),className:"px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white",children:[e.jsx("option",{value:"all",children:"All Payment"}),e.jsx("option",{value:"unpaid",children:"Unpaid"}),e.jsx("option",{value:"deposit_paid",children:"Deposit Paid"}),e.jsx("option",{value:"fully_paid",children:"Fully Paid"}),e.jsx("option",{value:"refund_pending",children:"Refund Pending"}),e.jsx("option",{value:"refunded",children:"Refunded"})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"text-xs text-gray-500 mb-1 block",children:"Date Range"}),e.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[e.jsx("input",{type:"date",value:R,onChange:t=>le(t.target.value),className:"px-3 py-2 border border-gray-200 rounded-lg text-sm",placeholder:"From"}),e.jsx("input",{type:"date",value:Y,onChange:t=>ie(t.target.value),className:"px-3 py-2 border border-gray-200 rounded-lg text-sm",placeholder:"To"})]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[e.jsxs("select",{value:oe,onChange:t=>qe(t.target.value),className:"px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white",children:[e.jsx("option",{value:"asc",children:"Date ↑ Soonest"}),e.jsx("option",{value:"desc",children:"Date ↓ Latest"})]}),e.jsx("button",{onClick:Xe,className:"px-3 py-2 text-red-700 border border-red-200 rounded-lg text-sm hover:bg-red-50",children:"Clear All"})]})]})]}),e.jsxs("p",{className:"text-xs text-gray-500 mb-2",children:[O.length," booking",O.length!==1?"s":""," found"]}),e.jsxs("div",{className:"space-y-2 max-h-[60vh] overflow-y-auto",children:[O.map(t=>{var r;return e.jsxs("button",{onClick:()=>{v(t),F(!1)},className:`w-full p-3 rounded-xl text-left ${(a==null?void 0:a.id)===t.id?"bg-red-50 border-2 border-red-700":"bg-gray-50 hover:bg-gray-100 border-2 border-transparent"}`,children:[e.jsxs("div",{className:"flex justify-between items-start mb-1",children:[e.jsx("span",{className:"font-medium text-gray-800 truncate",children:t.customer_name}),e.jsxs("div",{className:"flex items-center gap-1",children:[t.status==="completed"&&(!t.payment_status||t.payment_status==="unpaid")&&e.jsx("span",{title:"Completed but unpaid",className:"text-red-500 text-xs",children:"⚠️"}),e.jsx("span",{className:`px-2 py-0.5 rounded-full text-xs font-medium ${Ne(t.status)}`,children:t.status})]})]}),e.jsx("p",{className:"text-sm text-gray-500",children:t.event_date}),e.jsxs("div",{className:"flex items-center justify-between mt-1",children:[e.jsxs("span",{className:"text-sm text-gray-500",children:[t.number_of_pax," pax • ₱",(r=t.total_amount)==null?void 0:r.toLocaleString()]}),e.jsx("span",{className:`px-2 py-0.5 rounded-full text-xs font-medium ${Ye(t.payment_status)}`,children:He(t.payment_status)})]})]},t.id)}),O.length===0&&e.jsx("p",{className:"text-center text-gray-500 py-4",children:"No bookings found"})]})]})}),e.jsx("div",{className:"lg:col-span-2",children:a?e.jsxs("div",{className:"bg-white rounded-2xl shadow-lg overflow-hidden",children:[e.jsx("div",{className:"bg-gradient-to-r from-red-700 to-red-800 text-white p-6",children:e.jsxs("div",{className:"flex justify-between items-start",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-xl font-bold",children:a.customer_name}),e.jsxs("p",{className:"text-red-200",children:[(Se=De[a.menu_package])==null?void 0:Se.name," • ",a.menu_option]})]}),e.jsxs("div",{className:"flex items-center gap-2 flex-wrap justify-end",children:[e.jsxs("button",{onClick:Ge,className:"bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-sm flex items-center gap-1",children:[e.jsx(jt,{size:14})," Duplicate"]}),e.jsxs("button",{onClick:We,disabled:ue,className:"bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-sm flex items-center gap-1 disabled:opacity-50",children:[e.jsx(pt,{size:14})," ",ue?"Sending...":"Email"]}),e.jsxs("button",{onClick:Je,disabled:xe||he,className:"bg-white/20 hover:bg-amber-500 px-3 py-1 rounded-lg text-sm flex items-center gap-1 disabled:opacity-50",children:[e.jsx(vt,{size:14})," ",xe?"Sending...":he?"SMS...":"Remind"]}),e.jsxs("button",{onClick:()=>de(!0),className:"bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-sm flex items-center gap-1",children:[e.jsx(xt,{size:14})," Edit"]}),e.jsxs("button",{onClick:Ke,className:"bg-white/20 hover:bg-red-500 px-3 py-1 rounded-lg text-sm flex items-center gap-1",children:[e.jsx(gt,{size:14})," Delete"]}),e.jsxs("select",{value:a.status,onChange:t=>Oe(a.id,t.target.value),className:"bg-white/20 text-white border-0 rounded-lg px-3 py-1 text-sm",children:[e.jsx("option",{value:"pending",className:"text-gray-800",children:"Pending"}),e.jsx("option",{value:"confirmed",className:"text-gray-800",children:"Confirmed"}),e.jsx("option",{value:"completed",className:"text-gray-800",children:"Completed"}),e.jsx("option",{value:"cancelled",className:"text-gray-800",children:"Cancelled"})]})]})]})}),e.jsxs("div",{className:"p-6 space-y-6",children:[a.status==="completed"&&(!a.payment_status||a.payment_status==="unpaid")&&e.jsxs("div",{className:"bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-3",children:[e.jsx("span",{className:"text-xl",children:"⚠️"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-semibold text-red-800",children:"Completed but Unpaid"}),e.jsx("p",{className:"text-xs text-red-600",children:"This booking is marked as completed but has no payments recorded. Record a payment below."})]})]}),a.status==="completed"&&a.payment_status==="deposit_paid"&&e.jsxs("div",{className:"bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-3",children:[e.jsx("span",{className:"text-xl",children:"💰"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-semibold text-amber-800",children:"Balance Remaining"}),e.jsxs("p",{className:"text-xs text-amber-600",children:["Event completed with ₱",Math.max((a.total_amount||0)-(a.amount_paid||0),0).toLocaleString()," balance outstanding."]})]})]}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"bg-gray-50 rounded-xl p-4",children:[e.jsx("h3",{className:"font-semibold text-gray-700 mb-3",children:"Event"}),e.jsxs("div",{className:"space-y-2 text-sm",children:[e.jsxs("p",{className:"flex items-start gap-2",children:[e.jsx(te,{size:16,className:"text-gray-400 mt-0.5"}),a.event_date," at ",a.event_time]}),e.jsxs("p",{className:"flex items-start gap-2",children:[e.jsx(Me,{size:16,className:"text-gray-400 mt-0.5"}),a.venue]}),e.jsxs("p",{className:"flex items-center gap-2",children:[e.jsx(se,{size:16,className:"text-gray-400"}),a.number_of_pax," guests"]}),a.motif&&e.jsxs("p",{children:["🎨 ",a.motif]})]})]}),e.jsxs("div",{className:"bg-gray-50 rounded-xl p-4",children:[e.jsx("h3",{className:"font-semibold text-gray-700 mb-3",children:"Contact"}),e.jsxs("div",{className:"space-y-2 text-sm",children:[e.jsxs("p",{className:"flex items-center gap-2",children:[e.jsx(nt,{size:16,className:"text-gray-400"}),a.customer_phone]}),e.jsxs("p",{className:"flex items-center gap-2",children:[e.jsx(ht,{size:16,className:"text-gray-400"}),a.customer_email]})]})]})]}),e.jsx(ot,{bookingId:a.id,totalAmount:a.total_amount||0,currentStatus:a.payment_status,onStatusChange:()=>{N.from("bookings").select("*").eq("id",a.id).single().then(({data:t})=>{t&&(v(t),n(r=>r.map(l=>l.id===t.id?t:l)))})}}),e.jsxs("div",{className:"bg-gray-50 rounded-xl p-4",children:[e.jsxs("button",{onClick:()=>Re(!X),className:"w-full flex items-center justify-between",children:[e.jsxs("h3",{className:"font-semibold text-gray-700 flex items-center gap-2",children:[e.jsx(_t,{size:18})," Expense Tracking & Profit"]}),X?e.jsx(Ce,{size:18,className:"text-gray-400"}):e.jsx($e,{size:18,className:"text-gray-400"})]}),X&&(()=>{const t=a.expenses||{},r=(t.food_cost||0)+(t.staff_cost||0)+(t.rental_cost||0)+(t.transport_cost||0)+(t.other_cost||0),l=a.total_amount||0,o=l-r,u=l>0?(o/l*100).toFixed(1):0;return e.jsxs("div",{className:"mt-3 space-y-3",children:[e.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[[{key:"food_cost",label:"Food & Ingredients",icon:"🍖"},{key:"staff_cost",label:"Staff Wages",icon:"👥"},{key:"rental_cost",label:"Equipment Rental",icon:"📦"},{key:"transport_cost",label:"Transport & Gas",icon:"🚛"},{key:"other_cost",label:"Other Costs",icon:"📋"}].map(({key:p,label:b,icon:w})=>e.jsxs("div",{children:[e.jsxs("label",{className:"text-xs text-gray-500 mb-1 block",children:[w," ",b]}),e.jsx("input",{type:"number",min:"0",value:t[p]||"",placeholder:"0",onChange:I=>{const H={...t,[p]:parseInt(I.target.value)||0};v({...a,expenses:H})},className:"w-full px-3 py-1.5 border border-gray-200 rounded-lg text-sm"})]},p)),e.jsxs("div",{children:[e.jsx("label",{className:"text-xs text-gray-500 mb-1 block",children:"📝 Notes"}),e.jsx("input",{type:"text",value:t.notes||"",placeholder:"Expense notes...",onChange:p=>{const b={...t,notes:p.target.value};v({...a,expenses:b})},className:"w-full px-3 py-1.5 border border-gray-200 rounded-lg text-sm"})]})]}),e.jsx("div",{className:`rounded-lg p-3 ${o>=0?"bg-green-50 border border-green-200":"bg-red-50 border border-red-200"}`,children:e.jsxs("div",{className:"grid grid-cols-3 gap-2 text-center text-sm",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-gray-500 text-xs",children:"Revenue"}),e.jsxs("p",{className:"font-bold text-gray-800",children:["₱",l.toLocaleString()]})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-gray-500 text-xs",children:"Expenses"}),e.jsxs("p",{className:"font-bold text-red-600",children:["₱",r.toLocaleString()]})]}),e.jsxs("div",{children:[e.jsxs("p",{className:"text-gray-500 text-xs",children:["Profit (",u,"%)"]}),e.jsxs("p",{className:`font-bold ${o>=0?"text-green-600":"text-red-600"}`,children:["₱",o.toLocaleString()]})]})]})}),e.jsxs("button",{onClick:()=>Qe(a.expenses||{}),className:"w-full py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 flex items-center justify-center gap-2",children:[e.jsx(ae,{size:16})," Save Expenses"]})]})})()]}),a.review_rating&&e.jsxs("div",{className:"bg-amber-50 rounded-xl p-4",children:[e.jsxs("h3",{className:"font-semibold text-amber-800 mb-2 flex items-center gap-2",children:[e.jsx(Ee,{size:18})," Customer Review"]}),e.jsxs("div",{className:"flex items-center gap-1 mb-1",children:[[1,2,3,4,5].map(t=>e.jsx(Ee,{size:18,className:t<=a.review_rating?"text-amber-400 fill-amber-400":"text-gray-300"},t)),e.jsxs("span",{className:"text-sm text-gray-600 ml-2",children:[a.review_rating,"/5"]})]}),a.review_comment&&e.jsx("p",{className:"text-sm text-gray-700",children:a.review_comment})]}),(()=>{const t=d.filter(r=>r.id!==a.id&&(r.customer_name===a.customer_name||r.customer_phone===a.customer_phone));return t.length===0?null:e.jsxs("div",{className:"bg-purple-50 rounded-xl p-4",children:[e.jsxs("h3",{className:"font-semibold text-purple-800 mb-3 flex items-center gap-2",children:[e.jsx(se,{size:18})," Customer History (",t.length," previous)"]}),e.jsx("div",{className:"space-y-2 max-h-40 overflow-y-auto",children:t.slice(0,5).map(r=>{var l;return e.jsxs("div",{className:"flex items-center justify-between p-2 bg-white rounded-lg text-sm",children:[e.jsxs("div",{children:[e.jsx("p",{className:"font-medium text-gray-800",children:r.event_date}),e.jsxs("p",{className:"text-xs text-gray-500",children:[r.venue," • ",r.number_of_pax," pax"]})]}),e.jsxs("div",{className:"text-right",children:[e.jsxs("p",{className:"font-medium text-gray-800",children:["₱",(l=r.total_amount)==null?void 0:l.toLocaleString()]}),e.jsx("span",{className:`text-xs px-2 py-0.5 rounded-full ${Ne(r.status)}`,children:r.status})]})]},r.id)})}),t.length>5&&e.jsxs("p",{className:"text-xs text-purple-600 mt-2 text-center",children:["+",t.length-5," more bookings"]})]})})(),e.jsxs("div",{className:"bg-gray-50 rounded-xl p-4",children:[e.jsxs("div",{className:"flex items-center justify-between mb-3",children:[e.jsx("h3",{className:"font-semibold text-gray-700",children:"Assign Staff & Equipment"}),e.jsxs("button",{onClick:Ue,className:"px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-1.5",children:["⚡ Auto-Assign (",a.number_of_pax," pax)"]})]}),L.length>0&&e.jsxs("div",{className:"bg-amber-50 border border-amber-200 rounded-lg p-2.5 mb-3 text-xs",children:[e.jsxs("p",{className:"font-medium text-amber-800",children:["📅 ",L.length," other booking(s) on ",a.event_date,":"]}),L.map(t=>e.jsxs("p",{className:"text-amber-600 ml-4",children:["• ",t.customer_name," — ",t.number_of_pax," pax (",t.status,")"]},t.id))]}),e.jsxs("div",{className:"mb-4",children:[e.jsxs("label",{className:"text-sm text-gray-500 mb-2 block font-medium",children:["👥 Staff (",(a.assigned_staff||[]).length," assigned)"]}),["head_waiter","service","extra","student"].map(t=>{const r=(a.assigned_staff||[]).filter(u=>u.role===t),l={head_waiter:"Head Waiter",service:"Service",extra:"Extra",student:"Student"},o=Pe(a.number_of_pax||60)[t]||0;return o===0&&r.length===0?null:e.jsxs("div",{className:"mb-2",children:[e.jsxs("div",{className:"flex items-center justify-between mb-1",children:[e.jsxs("span",{className:"text-xs text-gray-400",children:[l[t]," (need ",o,")"]}),e.jsxs("span",{className:`text-xs font-medium ${r.length>=o?"text-green-600":"text-amber-600"}`,children:[r.length,"/",o]})]}),e.jsx("button",{onClick:()=>G(t),className:"w-full p-2.5 border-2 border-dashed border-gray-300 rounded-lg text-left hover:border-red-400 hover:bg-red-50",children:r.length>0?e.jsx("div",{className:"flex flex-wrap gap-1.5",children:r.map(u=>e.jsxs("span",{className:`px-2 py-0.5 rounded-full text-xs font-medium ${(u.type||"regular")==="on_call"?"bg-orange-100 text-orange-700":"bg-red-100 text-red-700"}`,children:[u.name," ",(u.type||"regular")==="on_call"&&"📞"]},u.id))}):e.jsxs("span",{className:"text-gray-400 text-sm",children:["+ Select ",l[t]]})})]},t)})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"text-sm text-gray-500 mb-2 block font-medium",children:"📦 Equipment"}),e.jsx("div",{className:"space-y-1.5 max-h-60 overflow-y-auto",children:y.map(t=>{const r=(a.assigned_equipment||{})[t.id]||0,l=je(t),o=(t.type||"owned")==="rental",u=ve[t.id]||0;return e.jsxs("div",{className:"flex items-center justify-between py-1.5 border-b border-gray-100",children:[e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsxs("div",{className:"flex items-center gap-1.5",children:[e.jsx("p",{className:"font-medium text-gray-800 text-sm truncate",children:t.name}),o&&e.jsx("span",{className:"px-1.5 py-0.5 bg-orange-100 text-orange-600 rounded text-[10px] font-medium shrink-0",children:"Rental"})]}),e.jsx("p",{className:"text-[11px] text-gray-400",children:o?`${t.supplier||"Supplier"} • ₱${(t.rental_cost||0).toLocaleString()}/unit`:`${l} free today${u>0?` (${u} on other events)`:""}`})]}),e.jsxs("div",{className:"flex items-center gap-1.5",children:[e.jsx("button",{onClick:()=>ye(t.id,r-1),disabled:r<=0,className:"w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 disabled:opacity-30 text-xs",children:e.jsx(ft,{size:12})}),e.jsx("span",{className:`w-7 text-center font-medium text-sm ${r>l&&!o?"text-red-600":""}`,children:r}),e.jsx("button",{onClick:()=>ye(t.id,r+1),disabled:!o&&r>=l,className:"w-7 h-7 rounded-full bg-red-700 text-white flex items-center justify-center hover:bg-red-800 disabled:opacity-30 text-xs",children:e.jsx(bt,{size:12})})]})]},t.id)})})]}),(()=>{const t=a.assigned_staff||[],r=a.assigned_equipment||{},l=t.filter(b=>(b.type||"regular")==="on_call"),o=l.reduce((b,w)=>b+(w.daily_rate||0),0),u=y.filter(b=>(b.type||"owned")==="rental"&&r[b.id]).reduce((b,w)=>b+(r[w.id]||0)*(w.rental_cost||0),0),p=o+u;return p===0?null:e.jsxs("div",{className:"bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3",children:[e.jsx("p",{className:"text-sm font-semibold text-blue-800 mb-1",children:"💰 Extra Costs"}),o>0&&e.jsxs("p",{className:"text-xs text-blue-600",children:["📞 On-Call Staff (",l.length,"): ₱",o.toLocaleString()]}),u>0&&e.jsxs("p",{className:"text-xs text-blue-600",children:["🏷️ Equipment Rental: ₱",u.toLocaleString()]}),e.jsxs("p",{className:"text-sm font-bold text-blue-800 mt-1 pt-1 border-t border-blue-200",children:["Total Additional: ₱",p.toLocaleString()]})]})})(),J&&e.jsx("div",{className:"bg-amber-50 border border-amber-300 rounded-lg p-2 mb-3 text-center",children:e.jsx("p",{className:"text-sm font-medium text-amber-800",children:"Unsaved changes — click Save below"})}),e.jsxs("button",{onClick:Be,disabled:ce,className:`w-full py-3 text-white rounded-xl font-medium disabled:opacity-50 flex items-center justify-center gap-2 ${J?"bg-amber-600 hover:bg-amber-700 animate-pulse":"bg-red-700 hover:bg-red-800"}`,children:[e.jsx(ae,{size:20})," ",ce?"Saving...":J?"Save Assignment *":"Save Assignment"]})]})]})]}):e.jsxs("div",{className:"bg-white rounded-2xl shadow-lg p-12 text-center",children:[e.jsx("div",{className:"w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4",children:e.jsx(te,{size:40,className:"text-gray-400"})}),e.jsx("h2",{className:"text-xl font-semibold text-gray-800 mb-2",children:"Select a Booking"}),e.jsx("p",{className:"text-gray-500",children:"Click on a booking to view and assign"})]})})]}),q&&e.jsx("div",{className:"fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4",children:e.jsxs("div",{className:"bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden",children:[e.jsxs("div",{className:"bg-red-700 text-white p-4 flex items-center justify-between",children:[e.jsxs("h3",{className:"font-semibold",children:["Select ",{head_waiter:"Head Waiter",service:"Service Staff",extra:"Extra Staff",student:"Students"}[q]||"Staff"]}),e.jsx("button",{onClick:()=>{G(null),K("")},className:"p-1 hover:bg-red-800 rounded-full",children:e.jsx(Te,{size:24})})]}),e.jsx("div",{className:"p-3 border-b",children:e.jsxs("div",{className:"relative",children:[e.jsx(ke,{className:"absolute left-3 top-2.5 text-gray-400",size:18}),e.jsx("input",{type:"text",placeholder:"Search staff...",value:Q,onChange:t=>K(t.target.value),className:"w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"})]})}),e.jsx("div",{className:"overflow-y-auto max-h-[55vh]",children:m.filter(t=>!(q==="head_waiter"&&t.role!=="head_waiter"||q==="service"&&t.role!=="service"&&t.role!=="extra"||q==="extra"&&t.role!=="extra"&&t.role!=="student"||q==="student"&&t.role!=="student"&&t.role!=="extra"||Q&&!t.name.toLowerCase().includes(Q.toLowerCase()))).sort((t,r)=>(t.type||"regular")==="regular"&&(r.type||"regular")!=="regular"?-1:(t.type||"regular")!=="regular"&&(r.type||"regular")==="regular"?1:t.name.localeCompare(r.name)).map(t=>{const r=((a==null?void 0:a.assigned_staff)||[]).some(p=>p.id===t.id),l=_e(t.id)&&!r,o=(t.type||"regular")==="on_call",u=!t.available||l;return e.jsxs("button",{onClick:()=>Fe(t,q),disabled:u,className:`w-full p-4 flex items-center justify-between border-b border-gray-100 ${u?"opacity-40 cursor-not-allowed":"hover:bg-red-50"} ${r?"bg-red-50":""}`,children:[e.jsxs("div",{className:"text-left min-w-0 flex-1",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("p",{className:"font-medium text-gray-800 truncate",children:t.name}),o&&e.jsx("span",{className:"px-1.5 py-0.5 bg-orange-100 text-orange-600 rounded text-[10px] font-medium",children:"📞 On-Call"}),!o&&e.jsx("span",{className:"px-1.5 py-0.5 bg-green-100 text-green-600 rounded text-[10px] font-medium",children:"Regular"})]}),e.jsxs("div",{className:"flex items-center gap-2 mt-0.5",children:[t.note&&e.jsx("p",{className:"text-xs text-gray-500",children:t.note}),o&&t.daily_rate>0&&e.jsxs("p",{className:"text-xs text-orange-500",children:["₱",t.daily_rate.toLocaleString(),"/day"]}),o&&t.phone&&e.jsx("p",{className:"text-xs text-gray-400",children:t.phone})]}),l&&e.jsxs("p",{className:"text-xs text-red-500 mt-0.5",children:["📅 Busy on ",a==null?void 0:a.event_date]}),!t.available&&!l&&e.jsx("p",{className:"text-xs text-red-500 mt-0.5",children:"Unavailable"})]}),r&&e.jsx(yt,{size:20,className:"text-red-700"})]},t.id)})}),e.jsx("div",{className:"p-4 border-t",children:e.jsx("button",{onClick:()=>{G(null),K("")},className:"w-full py-2 bg-red-700 text-white rounded-lg font-medium",children:"Done"})})]})}),ze&&a&&e.jsx(wt,{booking:a,onClose:()=>de(!1),onSave:Ve})]})})}export{es as default};
