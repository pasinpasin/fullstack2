import { useState, useEffect } from "react";

const PlanipdfComponent = (props) => {
  const [varA, setVarA] = useState(0);
  const [varB, setVarB] = useState(0);
  const [varC, setVarC] = useState(0);
  const [varD, setVarD] = useState(0);
  const [varE, setVarE] = useState(0);
  console.log(props);

  const increment = (chr) => {
    if (chr === "A") {
      setVarA((prev) => prev + 1);
    } else if (chr === "B") {
      setVarB((prev) => prev + 1);
    } else if (chr === "C") {
      setVarC((prev) => prev + 1);
    } else if (chr === "C") {
      setVarC((prev) => prev + 1);
    } else {
      setVarE((prev) => prev + 1);
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
                      {lende.tipiveprimtarise === "A"  ? (
                        this.increment("A") 
                           
                         varA === 1 ? (
                          <>
                            <td rowspan="{tipi.total}" width="40%">
                              LENDE BAZE-pergatitje metodologiike dhe kulture e
                              pergjithshme (Simboli A)
                            </td>
                            <td width="30%">{lende.emertimi}</td>
                            <td width="10%">{lende.kredite}</td>
                            <td rowspan="{ tipi.total }" width="10%">
                              {tipi.totkrediteveprimtari}
                            </td>
                            <td rowspan="{ tipi.total }" width="10%">
                              {tipi.percent}
                            </td>
                          </>
                        ) : (
                          <>
                            <td width="30%">{lende.emertimi}</td>
                            <td width="10%">{lende.kredite}</td>
                          </>
                        )
                        
                     
                      ) : lende.tipiveprimtarise === "B" ? (
                        this.increment("B")(varB === 1) ? (
                          <>
                            <td rowspan="{tipi.total}" width="40%">
                              LENDE BAZE-pergatitje metodologiike dhe kulture e
                              pergjithshme (Simboli B)
                            </td>
                            <td width="30%">{lende.emertimi}</td>
                            <td width="10%">{lende.kredite}</td>
                            <td rowspan="{ tipi.total }" width="10%">
                              {tipi.totkrediteveprimtari}
                            </td>
                            <td rowspan="{ tipi.total }" width="10%">
                              {tipi.percent}
                            </td>
                          </>
                        ) : (
                          <>
                            <td width="30%">{lende.emertimi}</td>
                            <td width="10%">{lende.kredite}</td>
                          </>
                        )
                      ) : lende.tipiveprimtarise === "C" ? (
                        this.increment("C")(varC === 1) ? (
                          <>
                            <td rowspan="{tipi.total}" width="40%">
                              LENDE BAZE-pergatitje metodologiike dhe kulture e
                              pergjithshme (Simboli C)
                            </td>
                            <td width="30%">{lende.emertimi}</td>
                            <td width="10%">{lende.kredite}</td>
                            <td rowspan="{ tipi.total }" width="10%">
                              {tipi.totkrediteveprimtari}
                            </td>
                            <td rowspan="{ tipi.total }" width="10%">
                              {tipi.percent}
                            </td>
                          </>
                        ) : (
                          <>
                            <td width="30%">{lende.emertimi}</td>
                            <td width="10%">{lende.kredite}</td>
                          </>
                        )
                      ) : lende.tipiveprimtarise === "D" ? (
                        this.increment("D")(varD === 1) ? (
                          <>
                            <td rowspan="{tipi.total}" width="40%">
                              LENDE BAZE-pergatitje metodologiike dhe kulture e
                              pergjithshme (Simboli D)
                            </td>
                            <td width="30%">{lende.emertimi}</td>
                            <td width="10%">{lende.kredite}</td>
                            <td rowspan="{ tipi.total }" width="10%">
                              {tipi.totkrediteveprimtari}
                            </td>
                            <td rowspan="{ tipi.total }" width="10%">
                              {tipi.percent}
                            </td>
                          </>
                        ) : (
                          <>
                            <td width="30%">{lende.emertimi}</td>
                            <td width="10%">{lende.kredite}</td>
                          </>
                        )
                      ) : this.increment("E")(varE === 1) ? (
                        <>
                          <td rowspan="{tipi.total}" width="40%">
                            LENDE BAZE-pergatitje metodologiike dhe kulture e
                            pergjithshme (Simboli E)
                          </td>
                          <td width="30%">{lende.emertimi}</td>
                          <td width="10%">{lende.kredite}</td>
                          <td rowspan="{ tipi.total }" width="10%">
                            {tipi.totkrediteveprimtari}
                          </td>
                          <td rowspan="{ tipi.total }" width="10%">
                            {tipi.percent}
                          </td>
                        </>
                      ) : (
                        <>
                          <td width="30%">{lende.emertimi}</td>
                          <td width="10%">{lende.kredite}</td>
                        </>
                      )}
                    </tr>
                    <tr bgcolor="#eef1f7">
                      <th colSpan="3" align="left">
                        Totali
                      </th>
                      {props.data.totkredite.totKredite}
                      <th width="10%"></th>
                      <th width="10%">{props.data.finaltotal_percent}</th>
                    </tr>
                  </>
                ) : (
                  <></>
                )}
              </>
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

export default PlanipdfComponent;
