const map = L.map('map').setView([40.7128, -74.0060], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

const properties = [
    { lat: 40.7580, lng: -73.9855, title: 'Luxury Penthouse', price: '$2,500,000' },
    { lat: 40.7489, lng: -73.9680, title: 'Modern Villa', price: '$3,200,000' },
    { lat: 40.7282, lng: -74.0776, title: 'Waterfront Estate', price: '$3,800,000' }
];

properties.forEach(property => {
    const marker = L.marker([property.lat, property.lng]).addTo(map);
    marker.bindPopup(`<strong>${property.title}</strong><br>${property.price}`);
});