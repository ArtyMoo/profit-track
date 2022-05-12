<template>
    <div class="container">
        <table class="table">
            <thead>
                <th scope="col">Date</th>
                <th scope="col">Gross</th>
                <th scope="col">Net</th>
                <th scope="col">Taxes (%)</th>
                <th scope="col">ETFs</th>
                <th scope="col">Given</th>
                <th scope="col">Donation</th>
                <th scope="col">Actions</th>
            </thead>
            <tbody onload="" id="rows">
                <tr v-for="row in table" :key="row">
                    <!-- DATE -->
                    <td>{{ row.date }}</td>
                    <!-- GROSS -->
                    <td>{{ (row.gross).toFixed(2) }}</td>
                    <!-- NET -->
                    <td>{{ (row.gross - row.gross * (row.taxes/100)).toFixed(2) }}</td>
                    <!-- TAXES -->
                    <td>{{ (row.taxes).toFixed(2) }}</td>
                    <!-- ETFs -->
                    <td>{{ (row.gross * 0.10).toFixed(2) }}</td>
                    <!-- GIVEN -->
                    <td>{{ (row.gross * 0.02).toFixed(2) }}</td>
                    <!-- IS DONATION? -->
                    <td>{{ row.donation }}</td>
                    <!-- DELETE BUTTON -->
                    <td><button class="btn btn-danger" @click="deleteRecord(`${ row.id }`)">Delete</button></td>
                </tr>
            </tbody>
        </table>
        <p class="align"><b>Available</b>: <span id="total">{{ available }}</span> €</p>
        <p class="align"><b>Invested</b> (more than that): <span id="total">{{ invested }}</span> €</p>
        <!-- 
        <p class="align"><b>Given</b> (less than that): <span id="total">{{ given }}</span> €</p>
        -->
    </div>
    <div id="form-container" class="container-fluid col-md-6 col-12">
        <h2>Add a new record:</h2>
        <div class="row d-flex justify-content-center">
            <form action="#" @submit.prevent="addRecord">
                <div class="mb-3">
                    <label style="float:left" for="">Gross</label>
                    <input v-model="gross" class="form-control" type="number" step=".01" required="true">
                </div>
                <div class="mb-3">
                    <label style="float:left" for="">Taxes (%)</label>
                    <input v-model="taxes" class="form-control" type="number" step=".01" required="true">
                </div>
                <div class="mb-3">
                    <label style="float:left" for="">Date</label>
                    <input v-model="date" class="form-control" type="date" required="true">
                </div>
                <div class="mb-3 form-check">
                    <input v-model="donation" type="checkbox" class="form-check-input">
                    <label style="float:left" class="form-check-label" for="">It's a donation</label>
                </div>
                <button type="submit" class="btn btn-primary">Submit record</button>
            </form>
        </div>
    </div>
</template>
<style scoped>
table {
    color: #fff;
}
p {
    text-align: left;
    font-size: 25px;
}
</style>
<script>
import { db } from "../firebase/db";
import { getDocs, setDoc,  deleteDoc, collection, query, doc } from "firebase/firestore"

export default {
    name: 'TableForm',

    data() {
        return {
            table: [],
            date: '',
            gross: '',
            taxes: '',
            donation: false,
            available: 0,
            invested: 0,
            given: 0
        }
    },

    mounted() {
        this.printRecords(this.table)
            .then( () => {
                this.table.forEach(record => {
                    this.totalCount(record, true);
                });
            });
    },

    methods: {
        pass() {
            //this.$emit('clicked', this.table);
        },

        totalCount(record, add) {
            if(add) {
                this.available += parseInt((record.gross - record.gross * (record.taxes/100)).toFixed(2)  - (record.gross * 0.10).toFixed(2) - (record.gross * 0.02).toFixed(2));
                this.invested += parseInt((record.gross * 0.10).toFixed(2));
                this.given += parseInt((record.gross * 0.02).toFixed(2));
            } else {
                this.available -= parseInt((record.gross - record.gross * (record.taxes/100)).toFixed(2) - (record.gross * 0.10).toFixed(2) - (record.gross * 0.02).toFixed(2));
                this.invested -= parseInt((record.gross * 0.10).toFixed(2));
                this.given -= parseInt((record.gross * 0.02).toFixed(2)); 
            }
        },

        async printRecords(table) {

            const rowsContainer = document.querySelector('#rows');
            const q = query( collection(db, 'balance'));
            const querySnapshot = await getDocs(q)

            querySnapshot.forEach((doc) => {
                table.push({
                    id: doc.id,
                    date: doc.data().date,
                    gross: doc.data().gross,
                    taxes: doc.data().taxes,
                    donation: doc.data().donation
                });
            });

            // Sort array by date
            table.sort((a, b) => {
                const date1 = new Date(a.date);
                const date2 = new Date(b.date);

                return -(date1 - date2);
            });

            return table;
        },

        async addRecord() {    
            
            // if fields are not empty
            if(this.gross && this.taxes && this.date) {
                // Send data to the database
                await db.collection('balance').add({
                    date: this.date,
                    gross: this.gross,
                    taxes: this.taxes,
                    donation: this.donation 
                // Add data to the array  
                }).then( (res) => {
                    if(this.donation)
                        this.taxes = 0.0;

                    this.table.unshift({
                        'id': this.date,
                        'date': this.date,
                        'gross': this.gross,
                        'taxes': this.taxes,
                        'donation': this.donation
                    })
                // Clear form fields and sum to the total
                }).then( () => {
                    this.totalCount(this.table[0], true)
                    this.date = this.gross = this.taxes = '';
                    this.donation = false;
                // Log error in case there is one
                }).catch( e => console.log(e));
            }
        },

        async deleteRecord(id) {

            await deleteDoc(doc(db, "balance", id)).then( () => {
                for(let i=0; i<this.table.length; i++)
                    if(this.table[i].id === id) {
                        this.totalCount(this.table[i], false);
                        this.table.splice(i, 1);
                        
                        return;
                    }
            });
        }
    }
};
</script>