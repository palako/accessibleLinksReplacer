const paragraphs = new Set();

function collectLinkParents() {
  document.querySelectorAll('a').forEach((element) => {
  if (element.textContent.trim().toLowerCase() === 'link') {
    const parent = element.parentElement;
    paragraphs.add(parent);
  }
  });
}

function replaceParagraphs() {
  paragraphs.forEach((parent) => {
      //if (parent) {
        const content = parent.outerHTML;
        chrome.storage.local.get(["openai_key"]).then((openai_key) => {
          openai_key = openai_key.openai_key;
          const response = fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openai_key}`
          },
          body: JSON.stringify({
            'model': 'gpt-4-1106-preview',
            'temperature' : 0,
            'response_format': {"type":"json_object"},
            'messages':[
              {"role": "system", "content": "You are a frontend developer capable of analysing and editng HTML. Format the output as JSON with an output variable called result"},
              {"role": "user", "content": `Given the following html surrounded by 5 hash(#) symbols: #####${content}#####, find the a link elements where the text says only the word 'link'. Rewrite the content so that instead, the href links are applied to the contextual references and remove the explicit 'link' texts.`}
            ]
          })
        })
        .then(response => response.json())
        .then (data => {
          parent.outerHTML = JSON.parse(data.choices[0].message.content).result;
        })
      });  
  });
}