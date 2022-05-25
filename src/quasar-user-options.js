import { Loading, Notify } from 'quasar';
import 'quasar/dist/quasar.css';
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';

// To be used on app.use(Quasar, { ... })
export default {
  config: {
    dark:true
  },
  plugins: {
    Loading,
    Notify,
  }
}


/*

examples for Loading , Notify

$q.loading.show();
        
$q.notify({
    type:'negative',
    color:'red',               
    message: "Invalid log-in credentials!",
});            

$q.notify({
  type:'negative',         
  color:'red',                     
  message: "Not authorised to access this page!",
});

$q.notify({                  
  message: `Logged in `,
});
        
$q.loading.hide();
        
*/
