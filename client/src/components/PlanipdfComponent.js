import { useState, useEffect } from "react";

const PlanipdfComponent = (props) => {
   const [varA, setVarA] = useState(0);
  const [varB, setVarB] = useState(0);
  const [varC, setVarC] = useState(0);
  const [varD, setVarD] = useState(0);
  const [varE, setVarE] = useState(0); 

 
 

  const increment = (chr,totali,teksti,emertimi,kredite,percent,totkrediteveprimtari) => {
    let vA=0,vB=0,vC=0,vD=0,vE=0;
    if (chr === "A") {
     //setVarA((prev) => prev + 1);
     setVarA((varA) => varA + 1)
     //vA++
       return( varA===1 ? ( <>  <td rowspan="{totali}" width="40%">
                              {teksti}
                            </td>
                            <td width="30%">{emertimi}</td>
                            <td width="10%">{kredite}</td>
                            <td rowspan="{ totali }" width="10%">
                              {totkrediteveprimtari}
                            </td>
                            <td rowspan="{ totali }" width="10%">
                              {percent}
                            </td> </>
                          
                        )  :( <>
                          
                            <td width="30%">{emertimi}</td>
                            <td width="10%">{kredite}</td></>
                           ))
    } else if (chr === "B") {
     // setVarB((prev) => prev + 1);
     setVarB((varB) => varB + 1)
     console.log(vB)
       return( varB===1 ? ( <> <td rowspan={totali} width="40%">
                              {teksti}
                            </td>
                            <td width="30%">{emertimi}</td>
                            <td width="10%">{kredite}</td>
                            <td rowspan={totali} width="10%">
                              {totkrediteveprimtari}
                            </td>
                            <td rowspan={totali} width="10%">
                              {percent}
                            </td> </>
                          
                        )  :( <>
                          
                            <td width="30%">{emertimi}</td>
                            <td width="10%">{kredite}</td></>
                           ))
    } else if (chr === "C") {
      //setVarC((prev) => prev + 1);
      setVarC((varC) => varC + 1)
       return( vC===1 ? ( <> <td rowspan="{totali}" width="40%">
                              {teksti}
                            </td>
                            <td width="30%">{emertimi}</td>
                            <td width="10%">{kredite}</td>
                            <td rowspan="{ totali }" width="10%">
                              {totkrediteveprimtari}
                            </td>
                            <td rowspan="{ totali }" width="10%">
                              {percent}
                            </td> </>
                          
                        )  :( <>
                          
                            <td width="30%">{emertimi}</td>
                            <td width="10%">{kredite}</td></>
                           ))
    } else if (chr === "C") {
      //setVarD((prev) => prev + 1);
      vD++
       return( vD===1 ? ( <> <td rowspan="{totali}" width="40%">
                              {teksti}
                            </td>
                            <td width="30%">{emertimi}</td>
                            <td width="10%">{kredite}</td>
                            <td rowspan="{ totali }" width="10%">
                              {totkrediteveprimtari}
                            </td>
                            <td rowspan="{ totali }" width="10%">
                              {percent}
                            </td> </>
                          
                        )  :( <>
                          
                            <td width="30%">{emertimi}</td>
                            <td width="10%">{kredite}</td></>
                           ))
    } else{
      //setVarE((prev) => prev + 1);
      vE++
       return( vE===1 ? ( <> <td rowspan="{totali}" width="40%">
                              {teksti}
                            </td>
                            <td width="30%">{emertimi}</td>
                            <td width="10%">{kredite}</td>
                            <td rowspan="{ totali }" width="10%">
                              {totkrediteveprimtari}
                            </td>
                            <td rowspan="{ totali }" width="10%">
                              {percent}
                            </td> </>
                          
                        )  :( <>
                          
                            <td width="30%">{emertimi}</td>
                            <td width="10%">{kredite}</td></>
                           ))
    }
  };

  return (
    <>
      <table class="maintab" width="100%">
        <tbody>
          <tr>
            <td align="center" colSpan="4">
              <img
                src="https://smak.unishk.edu.al/unireports/headerImage.png"
                alt="figure"
              />
            </td>
          </tr>

          <tr>
            <td>
              <span class="staff">
                {props.data.plani.programi.departamenti.fakulteti.emertimi}
              </span>
            </td>
            <td colSpan="2">
              <div class="staff">
                <b>{props.data.plani.programi.emertimi}</b>
              </div>
            </td>
            <td colSpan="2">
              <div class="staff">Viti Akademik {props.data.plani.periudha}</div>
            </td>
          </tr>

          <tr>
            <td width="30%"></td>
            <td colSpan="2"></td>
            <td width="30%"></td>
          </tr>
          <tr>
            <td width="30%">
              <div class="fakultname">
                {props.data.plani.programi.departamenti.emertimi}
              </div>
            </td>

            <td align="center" width="30%">
              <span class="staff">Cikli: {props.data.plani.cikli}</span>
            </td>
          </tr>
        </tbody>
      </table>

      <br></br>

      <table class="maintab" width="100%">
        <thead>
          <tr bgcolor="#ccd4e6">
            <th width="40%">
              <span class="staff">
                <b>Tipi i veprimtarisë dhe simboli përcaktues</b>
              </span>
            </th>
            <td width="30%">
              <div class="staff">
                <b>Fusha disiplinore apo veprimtari të tjera formuese</b>
              </div>
            </td>
            <td width="10%">
              <div class="staff">
                <b>Kredite</b>
              </div>
            </td>
            <td width="10%">
              <div class="staff">
                <b>Totali krediteve</b>
              </div>
            </td>
            <td width="10%">
              <div class="staff ">
                <b>%</b>
              </div>
            </td>
          </tr>
        </thead>
        <tbody>
          {props.data.obj1.map((tipi) =>
            props.data.obj2.map((lende) => (
              <>
              {lende.tipiveprimtarise === tipi.tipiveprimtarise ? (
                  <>
                    <tr bgcolor="#ccd4e6">
                      {lende.tipiveprimtarise === "A"  ? 
                        increment("A",tipi.totali,"lenda A",lende.emertimi,lende.kredite,tipi.percent,tipi.totkrediteveprimtari) 
                         : lende.tipiveprimtarise === "B" ? 
                         increment("B",tipi.totali,"lenda B",lende.emertimi,lende.kredite,tipi.percent,tipi.totkrediteveprimtari) 
                       : lende.tipiveprimtarise === "C" ? 
                          increment("C",tipi.totali,"lenda C",lende.emertimi,lende.kredite,tipi.percent,tipi.totkrediteveprimtari) 
                        
                       : lende.tipiveprimtarise === "D" ? 
                          increment("D",tipi.totali,"lenda D",lende.emertimi,lende.kredite,tipi.percent,tipi.totkrediteveprimtari) 
                      :   
                      increment("E",tipi.totali,"lenda E",lende.emertimi,lende.kredite,tipi.percent,tipi.totkrediteveprimtari) }
                      
                    </tr>
                   
                  </>
                ) : (
                  <></>
                )}
                </>
             
            ))
          )}
           <tr bgcolor="#eef1f7">
                      <th colSpan="3" align="left">
                        Totali
                      </th>
                      {props.data.totkredite.totKredite}
                      <th width="10%"></th>
                      <th width="10%">{props.data.finaltotal_percent}</th>
                    </tr>
        </tbody>
      </table>
    </>
  );
};

export default PlanipdfComponent;
