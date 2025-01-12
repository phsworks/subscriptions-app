import './style.css'
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;


const supabase = createClient(supabaseUrl, supabaseKey)

async function loadSubscriptions() {
  const {data, error} = await supabase
    .from('subscriptions')
    .select('*')
    .order('created_at', { ascending: true });

    if (error) {
      console.error('Error loading subscription', error);
    } else {
      const list = document.getElementById("subscription-list");
      list.innerHTML = '';

      data.forEach(sub => {
        const item = document.createElement('div');
        item.innerHTML = `<p> ${sub.name} - ${sub.price} - ${sub.billing_cycle} - ${sub.start_date} - ${sub.notes} </p>`;
        list.appendChild(item);
      });
    }
}


loadSubscriptions();
