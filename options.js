// Saves options to chrome.storage
const saveOptions = () => {
    const openai_key = document.getElementById('openai_key').value;
    
    chrome.storage.local.set(
      { openai_key: openai_key },
    );
    window.close();
  };
  
  const restoreOptions = () => {
    chrome.storage.local.get(["openai_key"]).then((item) => {
        document.getElementById('openai_key').value = item.openai_key;
      }
    );
  };
  
  document.addEventListener('DOMContentLoaded', restoreOptions);
  document.getElementById('save').addEventListener('click', saveOptions);