import React, { useState, useEffect, useRef, useCallback } from "react";
import { render } from "react-dom";

function App() {
  const [nombre, setNombre] = useState("nombre");

  const ref = useRef();
  
    
  const handleSubmit = (e) => {
    e.preventDefault();

    //setNombre(e.value);
  }
  

  const copyTextToClipboard = el => {
    const range = document.createRange(0);
    range.selectNode(el);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
  };

  const handleCopyClick = useCallback(() => {
    copyTextToClipboard(
      ref.current.querySelector("#signature-preview-workspace")
    );
  }, [ref]);




  return (
    <div>

      <form
        onChange={handleSubmit}
      >
        <input 
          type="text" 
          id="nombre"
          placeholder="Nombre"
          value={nombre}
          onChange={ e => setNombre(e.target.value)}
        />

        <input type="submit" value="Enviar" />

      </form>


      <div
        ref={ref}
        style={{ display: "flex", margin: "0 auto", justifyContent: "center" }}
        dangerouslySetInnerHTML={{
          __html: `
            <!DOCTYPE html>
            <html>
              <body style="margin:0;padding:0;">
                <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
                <table id="signature-preview-workspace" cellpadding="0" cellspacing="0">
                  <tbody>
                    <tr>
                      <td style="color: red;">Hi ${nombre} here...</td>
                    </tr>
                  </tbody>
                </table>
              </body>
            </html>
          `
        }}
      />
      

      <button
        onClick={() => {
          handleCopyClick();
        }}
      >
        Copy
      </button>
    </div>
  );
}

export default App;

