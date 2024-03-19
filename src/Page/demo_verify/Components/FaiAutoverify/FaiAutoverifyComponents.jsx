import React from "react";
import ChipError from "../Chip_Error/ErrorBadge";
import ChipNodata from "../Chip_Nodata/NoDataBadge";
import FaiAutoverify from "./Faiautoverify";
import BadgeComponentsFai_Verify from "./FaiSub";
function FaiAutoverifyComponents(props) {
  const {
    title,
    selectdatafromchip,
    groupfaidata_verify,
    statusgroupfaidata_verify,
    Messagegroupfaidata_verify,
    onClick,
  } = props;

  return (
    <div>
      {selectdatafromchip}
      {statusgroupfaidata_verify === "CATCH" ||
      statusgroupfaidata_verify === "ERROR" ? (
        <ChipError title={title} message={Messagegroupfaidata_verify} />
      ) : (
        <>
          {groupfaidata_verify && groupfaidata_verify.length > 0 ? (
            <>
              <FaiAutoverify
                groupfaidata_verify={groupfaidata_verify}
                Message={Messagegroupfaidata_verify}
                onClick={onClick}
              />

              {groupfaidata_verify.map((item, index) => (
                <BadgeComponentsFai_Verify
                  key={index} // Assuming `item.jwpv_job_type` + `item.jwpv_mc_code` combination is unique, you might use `${item.jwpv_job_type}-${item.jwpv_mc_code}` as a key instead of the index if preferred.
                  statusautoverify={item.jwpv_param_tvalue}
                  itemlabel={item.jwpv_job_type}
                  onClick={() => {
                    // getDataVerifyTableFromExpress(
                    //   item.jwpv_job_type,
                    //   item.jwpv_mc_code,
                    //   dataCardmc_lot_search[0].proc_grp_name
                    // );
                    // setselectdatafromchip(item.jwpv_job_type);
                    // setdataautoverify(item.data);
                    // setselectdatafromchip("Auto Verify");
                  }}
                />
              ))}
            </>
          ) : (
            // <ErrorBadge title={"Machine PM"} />
            <>
              <ChipNodata title={title} message={Messagegroupfaidata_verify} />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default FaiAutoverifyComponents;
