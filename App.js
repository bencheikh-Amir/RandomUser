const app = Vue.createApp({
    data() {
        return {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@gmail.com',
            phone: '(+213)0898794324',
            birthday: '19/11/1945',
            address: '6201 W Sherman Dr, Kalgoorlie, Western Australia, Australia 2704',
            gender: 'male',
            picture: 'https://randomuser.me/api/portraits/men/10.jpg'
        };
    },
    methods: {
        async getUser() {
            try {
                const res = await fetch('https://randomuser.me/api');
                const { results } = await res.json();
                const user = results[0];
                this.firstName = user.name.first;
                this.lastName = user.name.last;
                this.email = user.email;
                this.phone = user.phone;
                this.birthday = new Date(user.dob.date).toLocaleDateString();
                this.address = `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country} ${user.location.postcode}`;
                this.gender = user.gender;
                this.picture = user.picture.large;
            } catch (error) {
                console.error('Error fetching random user', error);
            }
        },
        copyUser() {
            const el = document.createElement('textarea');
            el.value = `Name: ${this.firstName} ${this.lastName}\nEmail: ${this.email}\nPhone: ${this.phone}\nBirthday: ${this.birthday}\nAddress: ${this.address}`;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            alert('User information copied to clipboard!');
        }
    },
});

app.mount('#app');
