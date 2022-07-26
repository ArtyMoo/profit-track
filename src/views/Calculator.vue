<template>
  <div class="calculator">
    <h1>Calculator</h1>
    <div id="form-container" class="container-fluid col-md-6 col-12">
      <div class="row d-flex justify-content-center">
        <form action="#" @submit.prevent="calculate">
            <div class="mb-3">
              <label style="float:left" for="">Gross</label>
              <input v-model="gross" class="form-control" type="number" step=".01" required="true">
            </div>
            <div class="mb-3">
              <label style="float:left" for="">VAT %</label>
              <input v-model="vat" class="form-control" type="number" step=".01" required="true">
            </div>
            <button type="submit" class="btn btn-primary">Calculate</button>
        </form>
      </div>
    </div>
  </div>
  <p style="margin-top: 100px; font-size: 40px;"><b>Taxable</b>: <span id="net">{{ taxable }}</span> €</p>
  <p style="margin-top: 25px; font-size: 75px;"><b>Net</b>: <span id="net">{{ net }}</span> €</p>
</template>

<script>

export default {
  name: 'calculator',
  
  data() {
    return {
      gross: '',
      vat: '',
      taxable: 0,
      tax: 0,
      net: 0
    }
  },

  methods: {
    calculate() {
      const vat = (this.vat / 100).toFixed(2);   
      // gross - vat
      const gross = (this.gross - this.gross * vat).toFixed(2);
      // taxable income
      this.taxable = (gross * 0.78).toFixed(2);
      // calculate taxes
      this.tax = (this.taxable * 0.3123).toFixed(2);
      // net
      this.net = (gross - this.tax).toFixed(2);
    }
  }

}

</script>