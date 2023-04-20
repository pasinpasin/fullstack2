import { useDispatch, useSelector } from "react-redux";
import { pdfPlani } from "../features/planetSlice";

const PlanipdfComponent = (props) => {
  const dispatch = useDispatch();
  const planiState = useSelector((state) => state.planiState);
  const { planipdf } = planiState;

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
  const getPDF = async () => {
    try {
      /* const resp = await axios.get(
        `http://127.0.0.1:8000/plani/${props.data.plani.id}/gjeneropdf`,
        {
          responseType: "blob",
          headers: { Authorization: `Bearer ${authTokens?.access}` },
        }
      ); */

      dispatch(pdfPlani(props.data.plani.id))
        .unwrap()
        .then((res) => {
          console.log(res);
          if (res.code === 200) {
            console.log(res);
            var url = window.URL.createObjectURL(res.data);
            var a = document.createElement("a");
            a.href = url;
            a.download = "kot";
            document.body.appendChild(a); // append the element to the dom
            a.click();
            a.remove(); // afterwards, remove the element

            return res;
          }
        });
    } catch (e) {
      throw e;
    }
  };

  return (
    <>
      <button onClick={getPDF}>Download PDF</button>
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
      <br></br>

      <table class="maintab" width="100%">
        {props.data.obj3.map((ngarkesa) => (
          <>
            <tr>
              <td colspan="3">
                <table class="maintab" width="100%">
                  <tr>
                    <td colspan="5" align="center">
                      <b>Viti {ngarkesa.viti}</b>
                    </td>
                  </tr>
                  <tr>
                    <td align="left" colspan="5">
                      {ngarkesa.totkreditepervit > 60 ? (
                        <span>
                          <b>
                            Numri Total i krediteve:
                            <span style={{ color: "#bf4040" }}>
                              <b>{ngarkesa.totkreditepervit}</b>
                            </span>
                          </b>
                        </span>
                      ) : (
                        <span>
                          <b>
                            Numri Total i krediteve
                            <span style={{ color: "#0080ff" }}>
                              <b>{ngarkesa.totkreditepervit}</b>
                            </span>
                          </b>
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td width="25%"></td>
                    <td align="center" width="24%">
                      <b>Semestri I</b>
                    </td>
                    <td width="2%"></td>
                    <td align="center" width="24%">
                      <b>Semestri II</b>
                    </td>
                    <td width="25%"></td>
                  </tr>

                  <tr>
                    <td width="25%"></td>
                    <td align="center" width="24%">
                      {ngarkesa.ngarkesasem1 > 25 ? (
                        <span>
                          Ngarkesa mesimore:{" "}
                          <span style={{ color: "#bf4040" }}>
                            <b>{ngarkesa.ngarkesasem1}</b>
                          </span>
                        </span>
                      ) : (
                        <span>
                          Ngarkesa mesimore:{" "}
                          <span style={{ color: "#0080ff" }}>
                            <b>{ngarkesa.ngarkesasem1}</b>
                          </span>
                        </span>
                      )}
                    </td>
                    <td width="2%"></td>
                    <td align="center" width="24%">
                      {ngarkesa.ngarkesasem2 > 25 ? (
                        <span>
                          Ngarkesa mesimore:{" "}
                          <span style={{ color: "#bf4040" }}>
                            <b>{ngarkesa.ngarkesasem2}</b>
                          </span>
                        </span>
                      ) : (
                        <span>
                          Ngarkesa mesimore:{" "}
                          <span style={{ color: "#0080ff" }}>
                            <b>{ngarkesa.ngarkesasem2}</b>
                          </span>
                        </span>
                      )}

                      <br></br>
                    </td>
                    <td width="25%"></td>
                  </tr>
                </table>
                <br></br>
                <table class="maintab" width="100%">
                  <tr>
                    <th bgcolor="#ccd4e6" rowspan="2">
                      Nr
                    </th>
                    <th bgcolor="#ccd4e6" rowspan="2">
                      Emertimi Lendes
                    </th>
                    <th bgcolor="#ccd4e6" rowspan="2">
                      Tipi Veprimtarise
                    </th>
                    <th bgcolor="#ccd4e6" rowspan="2">
                      Kredite
                    </th>
                    <th bgcolor="#ccd4e6" colspan="5">
                      Semestri I
                    </th>
                    <th bgcolor="#ccd4e6" colspan="5">
                      Semestri II
                    </th>
                    <th bgcolor="#ccd4e6" colspan="4">
                      Totali
                    </th>
                    <th bgcolor="#ccd4e6" width="4%" rowspan="2">
                      Ore jashte<br></br>auditorit
                    </th>
                    <th bgcolor="#ccd4e6" colspan="2">
                      Semestri
                    </th>
                  </tr>
                  <tr>
                    <th bgcolor="#ccd4e6" width="4%">
                      Nr Jave
                    </th>
                    <th bgcolor="#ccd4e6">Leks</th>
                    <th bgcolor="#ccd4e6">Sem</th>
                    <th bgcolor="#ccd4e6">Lab</th>
                    <th bgcolor="#ccd4e6" width="3%">
                      Prakt
                    </th>
                    <th bgcolor="#ccd4e6" width="4%">
                      Nr Jave
                    </th>
                    <th bgcolor="#ccd4e6">Leks</th>
                    <th bgcolor="#ccd4e6">Sem</th>
                    <th bgcolor="#ccd4e6">Lab</th>
                    <th bgcolor="#ccd4e6" width="3%">
                      Prakt
                    </th>
                    <th bgcolor="#ccd4e6">Leks</th>
                    <th bgcolor="#ccd4e6">Sem</th>
                    <th bgcolor="#ccd4e6">Lab</th>
                    <th bgcolor="#ccd4e6">Prakt</th>
                    <th bgcolor="#ccd4e6"> I </th>
                    <th bgcolor="#ccd4e6">II</th>
                  </tr>
                  {props.data.obj2.map(
                    (lendet) =>
                      lendet.viti === ngarkesa.viti && (
                        <tr>
                          <td bgcolor="#eef1f7">{lendet.renditja}</td>
                          <td bgcolor="#eef1f7">{lendet.emertimi}</td>
                          <td bgcolor="#eef1f7" align="center">
                            {lendet.tipiveprimtarise}
                          </td>
                          <td bgcolor="#eef1f7" align="center">
                            {lendet.kredite}
                          </td>
                          <td bgcolor="#eef1f7" align="center">
                            {lendet.nrjavesem1}
                          </td>
                          <td bgcolor="#eef1f7" align="center">
                            {lendet.leksionesem1}
                          </td>
                          <td bgcolor="#eef1f7" align="center">
                            {lendet.seminaresem1}
                          </td>
                          <td bgcolor="#eef1f7" align="center">
                            {lendet.laboratoresem1}
                          </td>
                          <td bgcolor="#eef1f7" align="center">
                            {lendet.praktikasem1}
                          </td>
                          <td bgcolor="#eef1f7" align="center">
                            {lendet.nrjavesem2}
                          </td>
                          <td bgcolor="#eef1f7" align="center">
                            {lendet.leksionesem2}
                          </td>
                          <td bgcolor="#eef1f7" align="center">
                            {lendet.seminaresem2}
                          </td>
                          <td bgcolor="#eef1f7" align="center">
                            {lendet.laboratoresem2}
                          </td>
                          <td bgcolor="#eef1f7" align="center">
                            {lendet.praktikasem2}
                          </td>
                          <td bgcolor="#eef1f7" align="center">
                            {lendet.totleksione}
                          </td>
                          <td bgcolor="#eef1f7" align="center">
                            {lendet.totseminare}
                          </td>
                          <td bgcolor="#eef1f7" align="center">
                            {lendet.totlaboratore}
                          </td>
                          <td bgcolor="#eef1f7" align="center">
                            {lendet.totpraktika}
                          </td>
                          <td bgcolor="#eef1f7" align="center"></td>
                          <td bgcolor="#eef1f7" align="center">
                            {lendet.semestri1}
                          </td>
                          <td bgcolor="#eef1f7" align="center">
                            {lendet.semestri2}
                          </td>
                        </tr>
                      )
                  )}
                  {props.data.zgjedhje && props.data.zgjedhje.length > 0 && (
                    <tr>
                      <td colspan="21" align="Center">
                        <br></br>
                        <table width="50%">
                          <tr>
                            <th bgcolor="#ccd4e6">Emërtimi i Lëndës</th>
                            <th bgcolor="#ccd4e6">Tipi i Veprimtarisë</th>
                          </tr>

                          {props.data.zgjedhje.map(
                            (lendemezgjedhje) =>
                              lendemezgjedhje.lenda.viti === ngarkesa.viti && (
                                <tr>
                                  <td bgcolor="#eef1f7">
                                    {lendemezgjedhje.emertimi}
                                  </td>
                                  <td bgcolor="#eef1f7">
                                    {lendemezgjedhje.lenda.emertimi}
                                  </td>
                                </tr>
                              )
                          )}
                        </table>
                        <br></br>
                      </td>
                    </tr>
                  )}

                  <tr>
                    <td colspan="21">
                      <br></br>
                    </td>
                  </tr>
                </table>
                <br></br>
                <br></br>
              </td>
            </tr>
          </>
        ))}

        <tr>
          <td colspan="3" align="right">
            <br></br>
            <br></br>
            <div class="footerdiv">
              <div class="staffname2">Drejtori i departamentit</div>
              <br></br>
              <br></br>
              <div class="staffname2"></div>
              <br></br>
              <br></br>
            </div>
          </td>
        </tr>
      </table>
    </>
  );
};

export default PlanipdfComponent;
