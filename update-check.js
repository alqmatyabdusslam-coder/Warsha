/* ====== فحص التحديثات + رقم النسخة ====== */
(function(){
  var SB_URL='https://vtrdmjidwhzurgtndnjv.supabase.co', SB_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0cmRtamlkd2h6dXJndG5kbmp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMzOTIxNjUsImV4cCI6MjEwODk2ODE2NX0.NRLbGHxuxRJG_0YfgfATzYcC5-ZnkDIIm8PZeNgHyh4';
  function mk(tag, css, txt){ var e=document.createElement(tag); if(css) e.style.cssText=css; if(txt) e.textContent=txt; return e; }
  function plug(n){ return window.Capacitor && Capacitor.Plugins && Capacitor.Plugins[n]; }
  async function run(){
    var App=plug('App'); if(!App) return;
    var info; try{ info=await App.getInfo(); }catch(e){ return; }
    var cur=parseInt(info.build,10)||0;
    document.body.appendChild(mk('div','text-align:center;font-size:12px;color:var(--muted);padding:12px 0 24px','الإصدار '+info.version));
    if(!window.supabase) return;
    try{
      var c=supabase.createClient(SB_URL,SB_KEY,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}});
      var r=await c.from('app_version').select('*').order('version_code',{ascending:false}).limit(1);
      var v=r.data&&r.data[0];
      if(!v||v.version_code<=cur) return;
      var dim=mk('div','position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:99999;display:flex;align-items:center;justify-content:center;padding:24px');
      var box=mk('div','background:var(--card);color:var(--text);border-radius:16px;padding:20px;max-width:340px;width:100%;text-align:center;line-height:1.7');
      box.dir='rtl';
      box.appendChild(mk('div','font-size:18px;font-weight:700','تحديث جديد '+v.version_name));
      if(v.notes) box.appendChild(mk('div','color:var(--muted);margin:8px 0',v.notes));
      var go=mk('button','display:block;width:100%;margin-top:14px;padding:12px;border:0;border-radius:12px;background:var(--accent);color:var(--accent-text);font-size:16px;font-weight:700','تحميل التحديث');
      go.onclick=function(){ var B=plug('Browser'); if(B) B.open({url:v.apk_url}); else location.href=v.apk_url; };
      box.appendChild(go);
      if(!v.force){
        var later=mk('button','display:block;width:100%;margin-top:8px;padding:10px;border:0;background:none;color:var(--muted);font-size:14px','لاحقاً');
        later.onclick=function(){ dim.remove(); };
        box.appendChild(later);
      }
      dim.appendChild(box); document.body.appendChild(dim);
    }catch(e){}
  }
  if(document.readyState==='complete') run(); else window.addEventListener('load',run);
})();
