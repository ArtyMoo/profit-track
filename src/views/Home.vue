<template>
  <div class="home">
    <TableForm />
  </div>
  
</template>

<script>

// @ is an alias to /src
import TableForm from "@/components/TableForm.vue";

export default {
  name: "Home",

  components: {
    TableForm,
  },
};

</script>
