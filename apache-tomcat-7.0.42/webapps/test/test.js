$.ajax({
   url: 'http://localhost:3000/hw',
   type: 'get',
   success: function(data) {
      console.log(data);
      // console.log(data.rows[0].key)

   }
});