import{u as X,r as p,s as _,j as e,X as J}from"./index-B3CN_A2s.js";import{C as K}from"./credit-card-C7MxLem7.js";import{T as Z}from"./trash-2-Dwt6RjAd.js";import{A as I}from"./alert-triangle-DrukLfTj.js";import{P as ee}from"./plus-C0ogG6sP.js";const E=t=>{if(t==null)return"";const r=String(t);return r.includes(",")||r.includes('"')||r.includes(`
`)?`"${r.replace(/"/g,'""')}"`:r},A=(t,r)=>{const n=t.map(E).join(","),o=r.map(m=>m.map(E).join(","));return[n,...o].join(`
`)},q=(t,r,n)=>{const o="\uFEFF",m=new Blob([o+t],{type:`${n};charset=utf-8`}),a=URL.createObjectURL(m),d=document.createElement("a");d.href=a,d.download=r,document.body.appendChild(d),d.click(),document.body.removeChild(d),URL.revokeObjectURL(a)},y=t=>t?new Date(t).toLocaleDateString("en-PH",{year:"numeric",month:"short",day:"numeric"}):"",R=t=>{if(!t)return"";const[r,n]=t.split(":"),o=parseInt(r);return`${o>12?o-12:o||12}:${n} ${o>=12?"PM":"AM"}`},f=t=>t!=null?`₱${Number(t).toLocaleString()}`:"",w=t=>t?t.split("_").map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join(" "):"",N=()=>new Date().toISOString().split("T")[0],ce=(t,r)=>{const n=["Date","Time","Customer","Phone","Email","Venue","Package","Menu Option","Guests","Total (₱)","Paid (₱)","Balance (₱)","Status","Payment","Motif","Special Requests","Created"],o=t.map(a=>[y(a.event_date),R(a.event_time),a.customer_name,a.customer_phone,a.customer_email||"",a.venue,a.menu_package,a.menu_option||"",a.number_of_pax,a.total_amount,a.amount_paid||0,Math.max((a.total_amount||0)-(a.amount_paid||0),0),w(a.status),w(a.payment_status||"unpaid"),a.motif||"",a.special_requests||"",y(a.created_at)]),m=A(n,o);q(m,`bookings-${N()}.csv`,"text/csv")},me=(t,r)=>{const n=["Date","Time","Customer","Phone","Email","Delivery Address","Items","Total (₱)","Status","Payment","Notes","Created"],o=t.map(a=>[y(a.delivery_date),R(a.delivery_time),a.customer_name,a.customer_phone,a.customer_email||"",a.delivery_address||"",(a.items||[]).map(d=>`${d.name} x${d.quantity}`).join("; "),a.total_amount,w(a.status),w(a.payment_status||"unpaid"),a.notes||"",y(a.created_at)]),m=A(n,o);q(m,`food-orders-${N()}.csv`,"text/csv")},H=(t,r,n="")=>{const o=window.open("","_blank");if(!o){alert("Please allow popups to export PDF");return}o.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>${t}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; padding: 20px; color: #333; font-size: 11px; }
        .header { text-align: center; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 2px solid #b91c1c; }
        .header h1 { color: #b91c1c; font-size: 20px; margin-bottom: 4px; }
        .header p { color: #666; font-size: 12px; }
        .summary { display: flex; gap: 20px; margin-bottom: 20px; flex-wrap: wrap; }
        .summary-card { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px 16px; flex: 1; min-width: 120px; }
        .summary-card .label { color: #666; font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; }
        .summary-card .value { font-size: 18px; font-weight: bold; color: #111; margin-top: 2px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th { background: #b91c1c; color: white; padding: 8px 6px; text-align: left; font-size: 10px; text-transform: uppercase; letter-spacing: 0.3px; }
        td { padding: 7px 6px; border-bottom: 1px solid #e5e7eb; font-size: 11px; }
        tr:nth-child(even) { background: #f9fafb; }
        tr:hover { background: #fef2f2; }
        .status { padding: 2px 8px; border-radius: 10px; font-size: 10px; font-weight: 600; }
        .status-pending { background: #fef3c7; color: #92400e; }
        .status-confirmed { background: #d1fae5; color: #065f46; }
        .status-completed { background: #dbeafe; color: #1e40af; }
        .status-cancelled { background: #fee2e2; color: #991b1b; }
        .status-preparing { background: #e0e7ff; color: #3730a3; }
        .status-ready { background: #d1fae5; color: #065f46; }
        .status-delivered { background: #dbeafe; color: #1e40af; }
        .status-unpaid { background: #fee2e2; color: #991b1b; }
        .status-deposit_paid { background: #fef3c7; color: #92400e; }
        .status-fully_paid { background: #d1fae5; color: #065f46; }
        .status-refund_pending { background: #ffedd5; color: #9a3412; }
        .status-refunded { background: #f3f4f6; color: #4b5563; }
        .status-paid { background: #d1fae5; color: #065f46; }
        .text-right { text-align: right; }
        .footer { margin-top: 20px; text-align: center; color: #999; font-size: 10px; border-top: 1px solid #e5e7eb; padding-top: 10px; }
        @media print { 
          body { padding: 10px; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Red Carpet Food and Catering Services</h1>
        <p>${t}</p>
      </div>
      ${n}
      ${r}
      <div class="footer">
        Generated on ${new Date().toLocaleDateString("en-PH",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}
        • ceburedcarpetcatering.com
      </div>
      <div class="no-print" style="text-align:center;margin-top:20px;">
        <button onclick="window.print()" style="background:#b91c1c;color:white;border:none;padding:10px 30px;border-radius:8px;font-size:14px;cursor:pointer;">
          Print / Save as PDF
        </button>
      </div>
    </body>
    </html>
  `),o.document.close()},D=t=>`<span class="status status-${t||"pending"}">${w(t||"pending")}</span>`,ue=(t,r)=>{const n=t.reduce((i,x)=>i+(x.total_amount||0),0),o=t.reduce((i,x)=>i+(x.amount_paid||0),0),m=t.reduce((i,x)=>i+(x.number_of_pax||0),0),a=`
    <div class="summary">
      <div class="summary-card"><div class="label">Bookings</div><div class="value">${t.length}</div></div>
      <div class="summary-card"><div class="label">Total Guests</div><div class="value">${m.toLocaleString()}</div></div>
      <div class="summary-card"><div class="label">Total Revenue</div><div class="value">${f(n)}</div></div>
      <div class="summary-card"><div class="label">Amount Paid</div><div class="value">${f(o)}</div></div>
      <div class="summary-card"><div class="label">Balance Due</div><div class="value">${f(n-o)}</div></div>
    </div>
  `,d=`
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Customer</th>
          <th>Venue</th>
          <th>Package</th>
          <th>Pax</th>
          <th class="text-right">Total</th>
          <th class="text-right">Paid</th>
          <th>Status</th>
          <th>Payment</th>
        </tr>
      </thead>
      <tbody>
        ${t.map(i=>`
          <tr>
            <td>${y(i.event_date)}</td>
            <td><strong>${i.customer_name}</strong><br/><span style="color:#666;font-size:10px">${i.customer_phone||""}</span></td>
            <td>${i.venue||""}</td>
            <td>${i.menu_package||""}<br/><span style="color:#666;font-size:10px">${i.menu_option||""}</span></td>
            <td>${i.number_of_pax}</td>
            <td class="text-right">${f(i.total_amount)}</td>
            <td class="text-right">${f(i.amount_paid)}</td>
            <td>${D(i.status)}</td>
            <td>${D(i.payment_status||"unpaid")}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;H(`Bookings Report — ${N()}`,d,a)},pe=(t,r)=>{const n=t.filter(a=>a.status!=="cancelled").reduce((a,d)=>a+(d.total_amount||0),0),o=`
    <div class="summary">
      <div class="summary-card"><div class="label">Orders</div><div class="value">${t.length}</div></div>
      <div class="summary-card"><div class="label">Total Revenue</div><div class="value">${f(n)}</div></div>
    </div>
  `,m=`
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Customer</th>
          <th>Items</th>
          <th>Address</th>
          <th class="text-right">Total</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${t.map(a=>`
          <tr>
            <td>${y(a.delivery_date)}${a.delivery_time?`<br/><span style="color:#666;font-size:10px">${R(a.delivery_time)}</span>`:""}</td>
            <td><strong>${a.customer_name}</strong><br/><span style="color:#666;font-size:10px">${a.customer_phone||""}</span></td>
            <td style="max-width:200px;font-size:10px">${(a.items||[]).map(d=>`${d.name} ×${d.quantity}`).join(", ")}</td>
            <td style="max-width:150px;font-size:10px">${a.delivery_address||""}</td>
            <td class="text-right">${f(a.total_amount)}</td>
            <td>${D(a.status)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;H(`Food Orders Report — ${N()}`,m,o)},T=[{value:"gcash",label:"GCash",icon:"📱",color:"bg-blue-100 text-blue-700"},{value:"maya",label:"Maya",icon:"📱",color:"bg-green-100 text-green-700"},{value:"bank_transfer",label:"Bank Transfer",icon:"🏦",color:"bg-purple-100 text-purple-700"},{value:"cash",label:"Cash",icon:"💵",color:"bg-emerald-100 text-emerald-700"},{value:"card",label:"Card",icon:"💳",color:"bg-orange-100 text-orange-700"},{value:"check",label:"Check",icon:"🧾",color:"bg-gray-100 text-gray-700"}],B={unpaid:{label:"Unpaid",color:"bg-red-100 text-red-700",dot:"bg-red-500"},deposit_paid:{label:"Deposit Paid",color:"bg-yellow-100 text-yellow-700",dot:"bg-yellow-500"},fully_paid:{label:"Fully Paid",color:"bg-green-100 text-green-700",dot:"bg-green-500"},refund_pending:{label:"Refund Pending",color:"bg-orange-100 text-orange-700",dot:"bg-orange-500"},refunded:{label:"Refunded",color:"bg-gray-100 text-gray-600",dot:"bg-gray-400"}},te=t=>T.find(r=>r.value===t)||T[3],ae=t=>B[t]||B.unpaid,u=t=>`₱${Number(t||0).toLocaleString()}`,se=t=>t?new Date(t).toLocaleDateString("en-PH",{month:"short",day:"numeric",year:"numeric"}):"";function xe({bookingId:t,foodOrderId:r,totalAmount:n=0,currentStatus:o,onStatusChange:m}){const{user:a}=X(),[d,i]=p.useState([]),[x,O]=p.useState(!0),[U,k]=p.useState(!1),[V,P]=p.useState(null),[z,M]=p.useState(!1),[F,$]=p.useState(""),[l,g]=p.useState({amount:"",method:"gcash",reference_number:"",payment_date:new Date().toISOString().split("T")[0],notes:""});p.useEffect(()=>{C()},[t,r]);const C=async()=>{try{let s=_.from("payments").select("*").order("payment_date",{ascending:!0});t&&(s=s.eq("booking_id",t)),r&&(s=s.eq("food_order_id",r));const{data:c,error:j}=await s;if(j)throw j;i(c||[])}catch(s){console.error("Error fetching payments:",s)}finally{O(!1)}},h=d.reduce((s,c)=>s+Number(c.amount||0),0),b=n-h,S=n>0?Math.min(h/n*100,100):0,G=async()=>{$("");const s=parseFloat(l.amount);if(!s||s<=0){$("Please enter a valid amount");return}M(!0);try{const c={amount:s,method:l.method,reference_number:l.reference_number||null,payment_date:l.payment_date,notes:l.notes||null,recorded_by:(a==null?void 0:a.id)||null};t&&(c.booking_id=t),r&&(c.food_order_id=r);const{error:j}=await _.from("payments").insert([c]);if(j)throw j;g({amount:"",method:"gcash",reference_number:"",payment_date:new Date().toISOString().split("T")[0],notes:""}),k(!1),await C(),m&&setTimeout(()=>m(),500)}catch(c){$(c.message)}finally{M(!1)}},Y=async s=>{try{const{error:c}=await _.from("payments").delete().eq("id",s);if(c)throw c;P(null),await C(),m&&setTimeout(()=>m(),500)}catch(c){alert("Error deleting payment: "+c.message)}},Q=async()=>{try{t&&await _.from("bookings").update({payment_status:"refunded"}).eq("id",t),r&&await _.from("food_orders").update({payment_status:"refunded"}).eq("id",r),m&&m()}catch(s){alert("Error: "+s.message)}},v=Math.round(n*.5),W=(h===0?[{label:`Full — ${u(n)}`,amount:n},{label:`50% — ${u(v)}`,amount:v}]:[{label:`Balance — ${u(b)}`,amount:Math.max(b,0)},...v<b?[{label:`50% — ${u(v)}`,amount:v}]:[]]).filter(s=>s.amount>0),L=ae(o);return x?e.jsxs("div",{className:"animate-pulse space-y-3",children:[e.jsx("div",{className:"h-16 bg-gray-100 rounded-xl"}),e.jsx("div",{className:"h-10 bg-gray-100 rounded-xl"})]}):e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"bg-gray-50 rounded-xl p-4",children:[e.jsxs("div",{className:"flex items-center justify-between mb-2",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(K,{size:16,className:"text-gray-400"}),e.jsx("span",{className:"text-sm font-medium text-gray-700",children:"Payment"}),e.jsx("span",{className:`px-2 py-0.5 rounded-full text-xs font-medium ${L.color}`,children:L.label})]}),e.jsxs("span",{className:"text-sm text-gray-500",children:[u(h)," / ",u(n)]})]}),e.jsx("div",{className:"h-3 bg-gray-200 rounded-full overflow-hidden",children:e.jsx("div",{className:`h-full rounded-full transition-all duration-500 ${S>=100?"bg-green-500":S>0?"bg-yellow-500":"bg-gray-300"}`,style:{width:`${S}%`}})}),e.jsxs("div",{className:"flex justify-between mt-1.5 text-xs text-gray-400",children:[e.jsxs("span",{children:["Paid: ",u(h)]}),b>0&&e.jsxs("span",{children:["Balance: ",u(b)]}),b<=0&&h>0&&e.jsx("span",{className:"text-green-600 font-medium",children:"✓ Fully Paid"})]})]}),d.length>0&&e.jsxs("div",{className:"space-y-2",children:[e.jsx("p",{className:"text-xs font-medium text-gray-500 uppercase tracking-wide",children:"Payment History"}),d.map(s=>{const c=te(s.method);return e.jsxs("div",{className:"flex items-center justify-between bg-white border border-gray-100 rounded-lg px-3 py-2.5 group hover:border-gray-200 transition-colors",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("span",{className:`w-8 h-8 rounded-full flex items-center justify-center text-sm ${c.color}`,children:c.icon}),e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"font-semibold text-gray-800 text-sm",children:u(s.amount)}),e.jsx("span",{className:`px-1.5 py-0.5 rounded text-[10px] font-medium ${c.color}`,children:c.label})]}),e.jsxs("div",{className:"flex items-center gap-2 text-xs text-gray-400",children:[e.jsx("span",{children:se(s.payment_date)}),s.reference_number&&e.jsxs("span",{children:["• Ref: ",s.reference_number]}),s.notes&&e.jsxs("span",{children:["• ",s.notes]})]})]})]}),V===s.id?e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx("button",{onClick:()=>Y(s.id),className:"px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700",children:"Delete"}),e.jsx("button",{onClick:()=>P(null),className:"px-2 py-1 bg-gray-200 text-gray-600 rounded text-xs hover:bg-gray-300",children:"Cancel"})]}):e.jsx("button",{onClick:()=>P(s.id),className:"opacity-0 group-hover:opacity-100 p-1.5 text-gray-300 hover:text-red-500 transition-all",children:e.jsx(Z,{size:14})})]},s.id)})]}),o==="refund_pending"&&e.jsxs("div",{className:"bg-orange-50 border border-orange-200 rounded-lg p-3 flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(I,{size:16,className:"text-orange-500"}),e.jsxs("span",{className:"text-sm text-orange-700",children:["Refund of ",u(h)," pending"]})]}),e.jsx("button",{onClick:Q,className:"px-3 py-1.5 bg-orange-500 text-white rounded-lg text-xs font-medium hover:bg-orange-600",children:"Mark Refunded"})]}),U?e.jsxs("div",{className:"bg-white border border-gray-200 rounded-xl p-4 space-y-3",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h4",{className:"font-medium text-gray-800 text-sm",children:"Record Payment"}),e.jsx("button",{onClick:()=>{k(!1),$("")},className:"text-gray-400 hover:text-gray-600",children:e.jsx(J,{size:16})})]}),F&&e.jsx("p",{className:"text-red-500 text-xs bg-red-50 rounded-lg p-2",children:F}),e.jsxs("div",{children:[e.jsx("label",{className:"text-xs text-gray-500 mb-1 block",children:"Amount (₱)"}),e.jsx("input",{type:"number",value:l.amount,onChange:s=>g({...l,amount:s.target.value}),placeholder:"0",className:"w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-lg font-semibold"}),e.jsx("div",{className:"flex gap-2 mt-2",children:W.map(s=>e.jsxs("button",{onClick:()=>g({...l,amount:String(s.amount)}),className:"px-3 py-1 bg-gray-100 rounded-lg text-xs text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors",children:[s.label," — ₱",s.amount.toLocaleString()]},s.label))})]}),e.jsxs("div",{children:[e.jsx("label",{className:"text-xs text-gray-500 mb-1 block",children:"Payment Method"}),e.jsx("div",{className:"grid grid-cols-3 gap-2",children:T.map(s=>e.jsxs("button",{onClick:()=>g({...l,method:s.value}),className:`px-3 py-2 rounded-lg text-xs font-medium border-2 transition-colors ${l.method===s.value?"border-red-500 bg-red-50 text-red-700":"border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-200"}`,children:[s.icon," ",s.label]},s.value))})]}),["gcash","maya","bank_transfer","card","check"].includes(l.method)&&e.jsxs("div",{children:[e.jsxs("label",{className:"text-xs text-gray-500 mb-1 block",children:["Reference Number ",l.method==="gcash"||l.method==="maya"?"(from receipt)":""]}),e.jsx("input",{type:"text",value:l.reference_number,onChange:s=>g({...l,reference_number:s.target.value}),placeholder:l.method==="bank_transfer"?"Bank transaction #":l.method==="check"?"Check #":"Reference #",className:"w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[e.jsxs("div",{children:[e.jsx("label",{className:"text-xs text-gray-500 mb-1 block",children:"Payment Date"}),e.jsx("input",{type:"date",value:l.payment_date,onChange:s=>g({...l,payment_date:s.target.value}),className:"w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"text-xs text-gray-500 mb-1 block",children:"Notes (optional)"}),e.jsx("input",{type:"text",value:l.notes,onChange:s=>g({...l,notes:s.target.value}),placeholder:"Deposit, Balance, etc.",className:"w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"})]})]}),e.jsx("button",{onClick:G,disabled:z,className:"w-full py-2.5 bg-red-700 text-white rounded-lg font-medium hover:bg-red-800 disabled:opacity-50 transition-colors text-sm",children:z?"Saving...":`Record ₱${parseFloat(l.amount||0).toLocaleString()} Payment`})]}):e.jsxs("button",{onClick:()=>k(!0),className:"w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:border-red-300 hover:text-red-600 transition-colors",children:[e.jsx(ee,{size:16})," Record Payment"]})]})}export{xe as P,ue as a,me as b,pe as c,ce as e};
