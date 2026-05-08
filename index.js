const firebaseConfig = {
    apiKey: "AIzaSyBje9SL2yJvkNayeCwQghB2ElskDnNYCLw",
    authDomain: "berestro-4db92.firebaseapp.com",
    projectId: "berestro-4db92",
    appId: "1:824573013152:web:f112c3cbc7fd84f60cedc5"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function loadOrders() {
    // Listens to the EXACT collection used in script.js
    db.collection("orders").orderBy("timestamp", "desc").onSnapshot(snap => {
        const feed = document.getElementById('order-feed');
        feed.innerHTML = "";
        let rev = 0;

        snap.forEach(doc => {
            const o = doc.data();
            rev += o.totalAmount;
            const card = document.createElement('div');
            card.className = "bg-white p-6 rounded-3xl border mb-4 shadow-sm";
            card.innerHTML = `
                <div class="flex justify-between border-b pb-2 mb-2">
                    <b>${o.customerName}</b>
                    <span class="text-orange-600 font-bold">₹${o.totalAmount}</span>
                </div>
                <ul class="text-sm text-stone-500">
                    ${o.items.map(i => `<li>${i.name} - ₹${i.price}</li>`).join('')}
                </ul>
            `;
            feed.appendChild(card);
        });
        document.getElementById('total-revenue').innerText = `₹${rev}`;
    });
}
window.onload = loadOrders;