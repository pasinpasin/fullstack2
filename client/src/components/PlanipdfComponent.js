import { useState, useEffect } from "react";

const PlanipdfComponent = (props) => {
  let vA = 0,
    vB = 0,
    vC = 0,
    vD = 0,
    vE = 0;
  const increment = (
    chr,
    totali,
    teksti,
    emertimi,
    kredite,
    percent,
    totkrediteveprimtari
  ) => {
    if (chr === "A") {
      vA++;
      return vA === 1 ? (
        <>
          <td rowSpan={totali} width="40%">
            {teksti}
          </td>
          <td width="30%">{emertimi}</td>
          <td width="10%">{kredite}</td>
          <td rowSpan={totali} width="10%">
            {totkrediteveprimtari}
          </td>
          <td rowSpan={totali} width="10%">
            {percent}
          </td>
        </>
      ) : (
        <>
          <td width="30%">{emertimi}</td>
          <td width="10%">{kredite}</td>
        </>
      );
    } else if (chr === "B") {
      vB++;
      console.log(vB);
      return vB === 1 ? (
        <>
          {" "}
          <td rowSpan={totali} width="40%">
            {teksti}
          </td>
          <td width="30%">{emertimi}</td>
          <td width="10%">{kredite}</td>
          <td rowSpan={totali} width="10%">
            {totkrediteveprimtari}
          </td>
          <td rowSpan={totali} width="10%">
            {percent}
          </td>{" "}
        </>
      ) : (
        <>
          <td width="30%">{emertimi}</td>
          <td width="10%">{kredite}</td>
        </>
      );
    } else if (chr === "C") {
      vC++;
      return vC === 1 ? (
        <>
          {" "}
          <td rowSpan={totali} width="40%">
            {teksti}
          </td>
          <td width="30%">{emertimi}</td>
          <td width="10%">{kredite}</td>
          <td rowSpan={totali} width="10%">
            {totkrediteveprimtari}
          </td>
          <td rowSpan={totali} width="10%">
            {percent}
          </td>{" "}
        </>
      ) : (
        <>
          <td width="30%">{emertimi}</td>
          <td width="10%">{kredite}</td>
        </>
      );
    } else if (chr === "D") {
      //setVarD((prev) => prev + 1);
      vD++;
      return vD === 1 ? (
        <>
          {" "}
          <td rowSpan={totali} width="40%">
            {teksti}
          </td>
          <td width="30%">{emertimi}</td>
          <td width="10%">{kredite}</td>
          <td rowSpan={totali} width="10%">
            {totkrediteveprimtari}
          </td>
          <td rowSpan={totali} width="10%">
            {percent}
          </td>{" "}
        </>
      ) : (
        <>
          <td width="30%">{emertimi}</td>
          <td width="10%">{kredite}</td>
        </>
      );
    } else {
      //setVarE((prev) => prev + 1);
      vE++;
      return vE === 1 ? (
        <>
          {" "}
          <td rowSpan={totali} width="40%">
            {teksti}
          </td>
          <td width="30%">{emertimi}</td>
          <td width="10%">{kredite}</td>
          <td rowSpan={totali} width="10%">
            {totkrediteveprimtari}
          </td>
          <td rowSpan={totali} width="10%">
            {percent}
          </td>{" "}
        </>
      ) : (
        <>
          <td width="30%">{emertimi}</td>
          <td width="10%">{kredite}</td>
        </>
      );
    }
  };

  return (
    <>
      <table className="maintab" width="100%">
        <tbody key="tbody2">
          <tr key="key1">
            <td align="center" colSpan="4">
              <img
                src="https://smak.unishk.edu.al/unireports/headerImage.png"
                alt="figure"
              />
            </td>
          </tr>

          <tr key="key2">
            <td>
              <span className="staff">
                {props.data.plani.programi.departamenti.fakulteti.emertimi}
              </span>
            </td>
            <td colSpan="2">
              <div className="staff">
                <b>{props.data.plani.programi.emertimi}</b>
              </div>
            </td>
            <td colSpan="2">
              <div className="staff">
                Viti Akademik {props.data.plani.periudha}
              </div>
            </td>
          </tr>

          <tr key="key3">
            <td width="30%"></td>
            <td colSpan="2"></td>
            <td width="30%"></td>
          </tr>
          <tr key="key4">
            <td width="30%">
              <div className="fakultname">
                {props.data.plani.programi.departamenti.emertimi}
              </div>
            </td>

            <td align="center" width="30%">
              <span className="staff">Cikli: {props.data.plani.cikli}</span>
            </td>
          </tr>
        </tbody>
      </table>

      <br></br>

      <table className="maintab" width="100%">
        <thead key="thead1">
          <tr bgcolor="#ccd4e6">
            <th width="40%">
              <span className="staff">
                <b>Tipi i veprimtarisë dhe simboli përcaktues</b>
              </span>
            </th>
            <td width="30%">
              <div className="staff">
                <b>Fusha disiplinore apo veprimtari të tjera formuese</b>
              </div>
            </td>
            <td width="10%">
              <div className="staff">
                <b>Kredite</b>
              </div>
            </td>
            <td width="10%">
              <div className="staff">
                <b>Totali krediteve</b>
              </div>
            </td>
            <td width="10%">
              <div className="staff ">
                <b>%</b>
              </div>
            </td>
          </tr>
        </thead>
        <tbody key="tbody1">
          {props.data.obj1.map((tipi) =>
            props.data.obj2.map((lende) => (
              <>
                {lende.tipiveprimtarise === tipi.tipiveprimtarise ? (
                  <>
                    <tr bgcolor="#ccd4e6" key={lende.id}>
                      {lende.tipiveprimtarise === "A"
                        ? increment(
                            "A",
                            tipi.total,
                            "LËNDË BAZË-përgatitje metodologjike dhe kulturë e përgjithshme (Simboli A)",
                            lende.emertimi,
                            lende.kredite,
                            tipi.percent,
                            tipi.totkrediteveprimtari
                          )
                        : lende.tipiveprimtarise === "B"
                        ? increment(
                            "B",
                            tipi.total,
                            "LËNDË KARAKTERIZUESE-përgatitje për disiplinën shkencore (Simboli B)",
                            lende.emertimi,
                            lende.kredite,
                            tipi.percent,
                            tipi.totkrediteveprimtari
                          )
                        : lende.tipiveprimtarise === "C"
                        ? increment(
                            "C",
                            tipi.total,
                            "LËNDË NDËRDISIPLINORE/INTEGRUESE-nëndidiplina, profile dhe grup-lëndë me zgjedhje (Simboli C)",
                            lende.emertimi,
                            lende.kredite,
                            tipi.percent,
                            tipi.totkrediteveprimtari
                          )
                        : lende.tipiveprimtarise === "D"
                        ? increment(
                            "D",
                            tipi.total,
                            "LËNDË PLOTËSUESE-gjuhë të huaja, njohuri informatike, praktika profesionale (Simboli D)",
                            lende.emertimi,
                            lende.kredite,
                            tipi.percent,
                            tipi.totkrediteveprimtari
                          )
                        : increment(
                            "E",
                            tipi.total,
                            "DETYRIME PËRMBYLLËSE. (Simboli E)",
                            lende.emertimi,
                            lende.kredite,
                            tipi.percent,
                            tipi.totkrediteveprimtari
                          )}
                    </tr>
                  </>
                ) : (
                  <></>
                )}
              </>
            ))
          )}
          <tr bgcolor="#eef1f7" key="totali">
            <th colSpan="3" align="left">
              Totali
            </th>

            <th width="10%" align="left">
              {props.data.totkredite.totKredite}
            </th>
            <th width="10%" align="left">
              {props.data.finaltotal_percent}
            </th>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default PlanipdfComponent;
