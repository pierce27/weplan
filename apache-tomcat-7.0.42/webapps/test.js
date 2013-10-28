$.ajax({
   url: 'http://localhost:3000/hw',
   type: 'get',
   dataType: 'jsonp',
   cache: false,
   timeout: 5000,
   success: function(data) {
      console.log(data);
      // console.log(data.rows[0].key)

   }
});