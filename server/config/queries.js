/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * @constructor
 */
var Queries = function () {
    
};

// Simbox queries

Queries.prototype.OFFNET_SIMBOx_MINUTES_PREFIX = "AO2P_OFFNETSIMBOX_USAGE_";

Queries.prototype.ONNETSIMBOX = "SELECT substr(SUSP_DATE,1,10) as susp_date,count(distinct substr(msisdn,4,9)) as msisdn from ("+
    "SELECT msisdn,SUSP_DATE,S_TYPE from figure_onnet_simbox  where upl_status = 'N' union all "+
    "SELECT msisdn,SUSP_DATE,S_TYPE from ao2p_fb_onnet_simbox@simbox_lnk union all "+
    "SELECT msisdn,SUSP_DATE,'S' from AO2P_ONNET_SIGOS@simbox_lnk) "+
    "where substr(SUSP_DATE,1,10)>= to_char(:sd,'YYYY-MM-DD') and substr(SUSP_DATE,1,10)<= to_char(:ed,'YYYY-MM-DD') and "+
	"substr(msisdn,4,9) not in (select msisdn from AO2P_COMPLAINT_LIST_BCKUP) "+
    "group by substr(SUSP_DATE,1,10) "+
    "ORDER BY substr(SUSP_DATE,1,10)";

Queries.prototype.OFFNETSIMBOX = "SELECT SUSP_DATE,COUNT(distinct msisdn) as msisdn from ("+
    "SELECT msisdn,substr(DED_DATE,1,10) as SUSP_DATE,'B' as S_TYPE from AO2P_OFFNET_FBS_SIMBOX union all "+
    "SELECT msisdn,substr(DETECTION_DATE,1,10) as SUSP_DATE,'S' as S_TYPE from AO2P_OFFNET_SIGOS@simbox_lnk union all "+
    "SELECT msisdn,substr(SUSP_DATE,1,10) as SUSP_DATE,'A' as S_TYPE from alain_offnet_araxxe"+
    ")where SUSP_DATE>= to_char(:sd,'YYYY-MM-DD') and SUSP_DATE <= to_char(:ed,'YYYY-MM-DD') "+
    "group by SUSP_DATE order by SUSP_DATE";


Queries.prototype.OFFNETSIMBOXNEXTTEL = "select SUSP_DATE,COUNT(distinct msisdn) AS MSISDN from ("+
"select msisdn,substr(DED_DATE,1,10) as SUSP_DATE,'B' as S_TYPE from AO2P_OFFNET_FBS_SIMBOX union all "+
"select msisdn,substr(DETECTION_DATE,1,10) as SUSP_DATE,'S' as S_TYPE from AO2P_OFFNET_SIGOS@simbox_lnk union all "+
"select msisdn,substr(SUSP_DATE,1,10) as SUSP_DATE,'A' as S_TYPE from alain_offnet_araxxe) "+
"where SUSP_DATE>= to_char(:sd,'YYYY-MM-DD') and SUSP_DATE <= to_char(:ed,'YYYY-MM-DD') "+
"and (substr(msisdn,4,2)='66' or substr(msisdn,4,3)='685') "+
"group by SUSP_DATE order by SUSP_DATE";

Queries.prototype.OFFNETSIMBOXORANGE = "select SUSP_DATE,COUNT(distinct msisdn) AS MSISDN from ("+
"select msisdn,substr(DED_DATE,1,10) as SUSP_DATE,'B' as S_TYPE from AO2P_OFFNET_FBS_SIMBOX union all "+
"select msisdn,substr(DETECTION_DATE,1,10) as SUSP_DATE,'S' as S_TYPE from AO2P_OFFNET_SIGOS@simbox_lnk union all "+
"select msisdn,substr(SUSP_DATE,1,10) as SUSP_DATE,'A' as S_TYPE from alain_offnet_araxxe) "+
"where SUSP_DATE>= to_char(:sd,'YYYY-MM-DD') and SUSP_DATE <= to_char(:ed,'YYYY-MM-DD') "+
"and (substr(msisdn,4,3) in ('655','656','657','658','659') or substr(msisdn,4,2)='69') "+
"group by SUSP_DATE order by SUSP_DATE";

Queries.prototype.OFFNETSIMBOXCAMTEL = "select SUSP_DATE,COUNT(distinct msisdn) AS MSISDN from ("+
"select msisdn,substr(DED_DATE,1,10) as SUSP_DATE,'B' as S_TYPE from AO2P_OFFNET_FBS_SIMBOX union all "+
"select msisdn,substr(DETECTION_DATE,1,10) as SUSP_DATE,'S' as S_TYPE from AO2P_OFFNET_SIGOS@simbox_lnk union all "+
"select msisdn,substr(SUSP_DATE,1,10) as SUSP_DATE,'A' as S_TYPE from alain_offnet_araxxe) "+
"where SUSP_DATE>= to_char(:sd,'YYYY-MM-DD') and SUSP_DATE <= to_char(:ed,'YYYY-MM-DD') "+
"and substr(msisdn,4,3) in ('222','233','242','243') "+
"group by SUSP_DATE order by SUSP_DATE";

Queries.prototype.MTNCSIMBOX = "select substr(SUSP_DATE,1,10) as susp_date,count(distinct substr(msisdn,4,9)) as msisdn from ("+
"select msisdn,SUSP_DATE,S_TYPE from figure_onnet_simbox union all "+
"select msisdn,SUSP_DATE,S_TYPE from ao2p_fb_onnet_simbox@simbox_lnk union all "+
"select msisdn,SUSP_DATE,'S' from AO2P_ONNET_SIGOS@simbox_lnk) "+
"where substr(SUSP_DATE,1,10)>= to_char(:sd,'YYYY-MM-DD') and substr(SUSP_DATE,1,10)<= to_char(:ed,'YYYY-MM-DD') "+
"group by substr(SUSP_DATE,1,10) ORDER BY substr(SUSP_DATE,1,10)";

Queries.prototype.OFFNETSIMBOXMINUTESCAMTEL = "select call_date, round(sum(minutes)) as minutes from ("+
"select to_char(to_date(DW_DATE_KEY,'YYYYMMDD'),'YYYY-MM-DD') as call_date, call_duration/60 as minutes from ?? "+
"where substr(calling_number,1,3) in ('222','233','242','243') and "+
"to_date(DW_DATE_KEY,'YYYYMMDD') >= trunc(:sd) and to_date(DW_DATE_KEY,'YYYYMMDD') <= trunc(:ed) "+
"union all "+
"select to_char(to_date(DW_DATE_KEY,'YYYYMMDD'),'YYYY-MM-DD') as call_date, call_duration/60 as minutes from ??? "+
"where substr(calling_number,1,3) in ('222','233','242','243') and "+
"to_date(DW_DATE_KEY,'YYYYMMDD') >= trunc(:sd) and to_date(DW_DATE_KEY,'YYYYMMDD') <= trunc(:ed)) "+
"group by call_date order by call_date";

Queries.prototype.OFFNETSIMBOXMINUTESNEXTTEL = "select call_date, round(sum(minutes)) as minutes from ("+
"select to_char(to_date(DW_DATE_KEY,'YYYYMMDD'),'YYYY-MM-DD') as call_date, call_duration/60 as minutes from ?? "+
"where (substr(calling_number,1,2)='66' or substr(calling_number,1,3)='685') and "+
"to_date(DW_DATE_KEY,'YYYYMMDD') >= trunc(:sd) and to_date(DW_DATE_KEY,'YYYYMMDD') <= trunc(:ed) "+
"union all "+
"select to_char(to_date(DW_DATE_KEY,'YYYYMMDD'),'YYYY-MM-DD') as call_date, call_duration/60 as minutes from ??? "+
"where (substr(calling_number,1,2)='66' or substr(calling_number,1,3)='685') and "+
"to_date(DW_DATE_KEY,'YYYYMMDD') >= trunc(:sd) and to_date(DW_DATE_KEY,'YYYYMMDD') <= trunc(:ed)) "+
"group by call_date order by call_date";

Queries.prototype.OFFNETSIMBOXMINUTESORANGE = "select call_date, round(sum(minutes)) as minutes from ("+
"select to_char(to_date(DW_DATE_KEY,'YYYYMMDD'),'YYYY-MM-DD') as call_date, call_duration/60 as minutes from ?? "+
"where (substr(calling_number,1,3) in ('655','656','657','658','659') or substr(calling_number,1,2)='69') and "+
"to_date(DW_DATE_KEY,'YYYYMMDD') >= trunc(:sd) and to_date(DW_DATE_KEY,'YYYYMMDD') <= trunc(:ed) "+
"union all "+
"select to_char(to_date(DW_DATE_KEY,'YYYYMMDD'),'YYYY-MM-DD') as call_date, call_duration/60 as minutes from ??? "+
"where (substr(calling_number,1,3) in ('655','656','657','658','659') or substr(calling_number,1,2)='69') and "+
"to_date(DW_DATE_KEY,'YYYYMMDD') >= trunc(:sd) and to_date(DW_DATE_KEY,'YYYYMMDD') <= trunc(:ed)) "+
"group by call_date order by call_date";

Queries.prototype.ONNETSIMBOXSUSPAFTERDETECTION = "select SUSP_DATE, MINUTES*60+SECONDES as secondes from ("+
"select substr(dates,0,10) as SUSP_DATE,trunc(trunc(avg(DIF))/60) as MINUTES,trunc(avg(DIF))-trunc(trunc(avg(DIF))/60)*60 as SECONDES,MIN(DIF),MAX(DIF) from ("+
"select dates,(to_date(susp_date,'YYYY-MM-DD hh24:mi:ss')+0/24) as susp_date, ((to_date(susp_date,'YYYY-MM-DD hh24:mi:ss')+0/24)-to_date(dates,'YYYY-MM-DD hh24:mi:ss'))*24*3600 as DIF from "+
"(select * from AO2P_FB_ONNET_SIMBOX@simbox_lnk where substr(DATES,12,2)-substr(SUSP_DATE,12,2)>=0 and substr(DATES,9,2)=substr(SUSP_DATE,9,2)) "+
"where trunc(to_date(dates,'YYYY-MM-DD hh24:mi:ss')) between trunc(:sd) and trunc(:ed)) "+
"group by substr(dates,0,10) order by substr(dates,0,10) asc)";

Queries.prototype.SIMBOXONNETMINUTES = "select DW_DATE_KEY, sum(call_duration/60) from ?? "+
"where DW_DATE_KEY = :call_date group by DW_DATE_KEY";

Queries.prototype.SIMBOXONNETMINUTES_TABLE_PREFIX = "ALAIN_SIMBOX_ONNET_";

Queries.prototype.MOUOFSIMBOX = "select '1 - 10' as mou_range, count(CCN_A_NUMBER_NORMALIZED) as MSISDN, round(sum(TOTAL_DUR)) as MINUTES from (select CCN_A_NUMBER_NORMALIZED,sum(CCN_DURATION/60) as TOTAL_DUR from (select CALLING_NUMBER as CCN_A_NUMBER_NORMALIZED,sum(call_duration) as CCN_DURATION from ## "+
"group by CALLING_NUMBER) group by CCN_A_NUMBER_NORMALIZED) where TOTAL_DUR <=10 and TOTAL_DUR >=1 union all "+
"select '11 - 25' as mou_range, count(CCN_A_NUMBER_NORMALIZED) as MSISDN, round(sum(TOTAL_DUR)) as MINUTES from (select CCN_A_NUMBER_NORMALIZED,sum(CCN_DURATION/60) as TOTAL_DUR from (select CALLING_NUMBER as CCN_A_NUMBER_NORMALIZED,sum(call_duration) as CCN_DURATION from ## "+
"group by CALLING_NUMBER) group by CCN_A_NUMBER_NORMALIZED) where TOTAL_DUR >10 and TOTAL_DUR <=25 union all "+
"select '26 - 50' as mou_range, count(CCN_A_NUMBER_NORMALIZED) as MSISDN, round(sum(TOTAL_DUR)) as MINUTES from (select CCN_A_NUMBER_NORMALIZED,sum(CCN_DURATION/60) as TOTAL_DUR from (select CALLING_NUMBER as CCN_A_NUMBER_NORMALIZED,sum(call_duration) as CCN_DURATION from ## "+
"group by CALLING_NUMBER) group by CCN_A_NUMBER_NORMALIZED) where TOTAL_DUR >25 and TOTAL_DUR <=50 union all "+
"select 'More than 50' as mou_range, count(CCN_A_NUMBER_NORMALIZED) as MSISDN, round(sum(TOTAL_DUR)) as MINUTES from (select CCN_A_NUMBER_NORMALIZED,sum(CCN_DURATION/60) as TOTAL_DUR from (select CALLING_NUMBER as CCN_A_NUMBER_NORMALIZED,sum(call_duration) as CCN_DURATION from ## "+
"group by CALLING_NUMBER) group by CCN_A_NUMBER_NORMALIZED) where TOTAL_DUR >50";

Queries.prototype.TOTAL_SIMBOX_TABLE_PREFIX = "AO2P_ONNET_";

Queries.prototype.TOTALMONTHSIMBOX = "select count(distinct msisdn) from ??";

Queries.prototype.AVGONNETSIMBOXPERDAY = "select MONTH, round(TTTs/ABss) AVERAGE from ("+
"select substr(SUSP_DATE,1,7) MONTH,count(distinct substr(msisdn,4,9)) TTTs,count(distinct(substr(SUSP_DATE,1,10))) ABss from"+
"(select susp_date, msisdn from figure_onnet_simbox where upl_status = 'N' union all select susp_date, msisdn from ao2p_fb_onnet_simbox@simbox_lnk union all "+ 
"select susp_date, msisdn from AO2P_ONNET_SIGOS@simbox_lnk) where "+
"substr(msisdn,4,9) not in (select msisdn from AO2P_COMPLAINT_LIST_BCKUP) " + 
"and to_date(substr(susp_date, 1, 10),'YYYY-MM-DD') between add_months(trunc(sysdate-1, 'month'), -12) and trunc(sysdate-1, 'month') "+
"group by substr(SUSP_DATE,1,7) order by substr(SUSP_DATE,1,7)) where ABss <> 0";

Queries.prototype.AVGOFFNETSIMBOXPERDAY = "select MONTH, round(somme/ABss) AVERAGE from ("+
"select substr(SUSP_DATE,1,7) MONTH,COUNT(distinct msisdn) somme, count(distinct(substr(SUSP_DATE,1,10))) ABss from ("+
"select msisdn,substr(DED_DATE,1,10) as SUSP_DATE,'B' as S_TYPE from AO2P_OFFNET_FBS_SIMBOX "+
"union all select msisdn,substr(DETECTION_DATE,1,10) as SUSP_DATE,'S' as S_TYPE from AO2P_OFFNET_SIGOS@simbox_lnk union all "+
"select msisdn,substr(SUSP_DATE,1,10) as SUSP_DATE,'A' as S_TYPE from alain_offnet_araxxe) where "+
"to_date(substr(susp_date, 1, 10),'YYYY-MM-DD') between add_months(trunc(sysdate-1, 'month'), -12) and trunc(sysdate-1, 'month') "+
"group by substr(SUSP_DATE,1,7) order by substr(SUSP_DATE,1,7))";

Queries.prototype.INSERTBICSMINUTES = "MERGE INTO PN2A_BICS_MINUTES USING dual ON ( m_date=:m_date ) "+
"WHEN MATCHED THEN UPDATE SET incoming = :incoming , outgoing = :outgoing "+
"WHEN NOT MATCHED THEN INSERT (m_date, incoming, outgoing) "+
"VALUES ( :m_date, :incoming, :outgoing )";

Queries.prototype.INTERNATIONALMINUTES = "select * from PN2A_BICS_MINUTES where trunc(to_date(m_date, 'YYYY-MM-DD')) >= trunc(:sd) and "+
        "trunc(to_date(m_date, 'YYYY-MM-DD')) <= trunc(:ed) order by m_date";

Queries.prototype.SIMBOXMINUTES = "select  to_char(to_date(DW_DATE_KEY,'YYYYMMDD'),'YYYY-MM-DD') as m_date, round(sum(call_duration/60)) as minutes from ("+
"select dw_date_key, call_duration from AO2P_OFFNETSIMBOX_USAGE_?? union all "+
"select dw_date_key, call_duration from ALAIN_SIMBOX_ONNET_???) "+
"where to_date(DW_DATE_KEY, 'YYYYMMDD') between trunc(:sd) and trunc(:ed) " +
"group by  to_char(to_date(DW_DATE_KEY,'YYYYMMDD'),'YYYY-MM-DD') "+ 
"order by  to_char(to_date(DW_DATE_KEY,'YYYYMMDD'),'YYYY-MM-DD')";

Queries.prototype.MONTHLYAVERAGEMINUTES = "select substr(m_date, 1, 7) month, round(avg(incoming)) average from PN2A_BICS_MINUTES " +
"where to_date(m_date, 'YYYY-MM-DD') BETWEEN TRUNC (ADD_MONTHS (SYSDATE, -13), 'MM') "+
"AND TRUNC (SYSDATE-1) "+
"group by  substr(m_date, 1, 7) order by substr(m_date, 1, 7)";

Queries.prototype.DAILYINCOMINGMINUTES = "select week, day, incoming from"+
"(select to_char(to_date(m_date, 'YYYY-MM-DD'),'Dy') as day, incoming, concat(to_char(TRUNC(to_date(m_date, 'YYYY-MM-DD'), 'iw'), 'DD-MON - '), to_char(TRUNC(to_date(m_date, 'YYYY-MM-DD'), 'iw') + 7 - 1/86400,'DD-MON')) as week "+
"from pn2a_bics_minutes "+
"where to_date(m_date, 'YYYY-MM-DD') between TRUNC(:sd, 'iw') and TRUNC(:ed) "+
"order by m_date)";

Queries.prototype.MTDSIMBOX = "select substr(SUSP_DATE,1,7) month, substr(SUSP_DATE,9,2) day, msisdn,  sum(msisdn) OVER (partition by substr(SUSP_DATE,1,7) order by susp_date, msisdn) cumul from "+
"(SELECT substr(SUSP_DATE,1,10) as susp_date,count(distinct substr(msisdn,4,9)) as msisdn from ("+
"SELECT msisdn,SUSP_DATE,S_TYPE from figure_onnet_simbox union all "+
"SELECT msisdn,SUSP_DATE,S_TYPE from ao2p_fb_onnet_simbox@simbox_lnk union all "+
"SELECT msisdn,SUSP_DATE,'S' from AO2P_ONNET_SIGOS@simbox_lnk) "+
"where substr(SUSP_DATE,1,10)>= to_char(trunc(trunc(trunc(sysdate,'MM')-1,'MM')-1, 'MM'),'YYYY-MM-DD') and substr(SUSP_DATE,1,10)<= to_char(sysdate-1,'YYYY-MM-DD') "+
"group by substr(SUSP_DATE,1,10) ORDER BY substr(SUSP_DATE,1,10))";

Queries.prototype.PARTNERSVSSIMBOX = "select * from pn2a_partners_vs_simbox where simbox > 100 and m_date = (select max(m_date) from pn2a_partners_vs_simbox) order by simbox desc fetch next 10 rows only";

// Momo queries

Queries.prototype.MOMOCASHOUTGT10 = "select to_char(to_date(transactions_date,'YYYYMMDD'),'YYYY-MM-DD') m_date, count(*) msisdn from PN2A_MOMO_CASH_OUT_DAILY_GT10 where to_date(transactions_date, 'YYYYMMDD') between trunc(:sd) "+
        "and trunc(:ed) group by to_char(to_date(transactions_date,'YYYYMMDD'),'YYYY-MM-DD') order by to_char(to_date(transactions_date,'YYYYMMDD'),'YYYY-MM-DD')";

Queries.prototype.MOMOCASHINGT10 = "select to_char(to_date(transactions_date,'YYYYMMDD'),'YYYY-MM-DD') m_date, count(*) msisdn from PN2A_MOMO_CASH_IN_DAILY_GT10 where to_date(transactions_date, 'YYYYMMDD') between trunc(:sd) "+
        "and trunc(:ed) group by to_char(to_date(transactions_date,'YYYYMMDD'),'YYYY-MM-DD') order by to_char(to_date(transactions_date,'YYYYMMDD'),'YYYY-MM-DD')";

Queries.prototype.MOMOVOUCHERSENTGT10 = "select to_char(to_date(transactions_date,'YYYYMMDD'),'YYYY-MM-DD') m_date, count(*) msisdn from PN2A_MOMO_TO_VCHR_DAILY_GT10 where to_date(transactions_date, 'YYYYMMDD') between trunc(:sd) "+
        "and trunc(:ed) group by to_char(to_date(transactions_date,'YYYYMMDD'),'YYYY-MM-DD') order by to_char(to_date(transactions_date,'YYYYMMDD'),'YYYY-MM-DD')";

Queries.prototype.MOMOCASHINMONTHLY = "select to_char(to_date(m_date,'YYYYMMDD'),'YYYY-MM-DD') m_date, count(*) msisdn from PN2A_MOMO_HU_MONTHLY_CASH_IN where to_date(m_date, 'YYYYMMDD') between trunc(:sd) "+
        "and trunc(:ed) group by m_date order by m_date";

Queries.prototype.MOMOCASHOUTMONTHLY = "select to_char(to_date(m_date,'YYYYMMDD'),'YYYY-MM-DD') m_date, count(*) msisdn from PN2A_MOMO_HU_MONTHLY_CASH_OUT where to_date(m_date, 'YYYYMMDD') between trunc(:sd) "+
        "and trunc(:ed) group by m_date order by m_date";

Queries.prototype.MOMOOPERATIONSBETWEENSIMSWAP = "select to_char(to_date(m_date,'YYYYMMDD'),'YYYY-MM-DD') m_date, SUM("+
"case when operation_type='CASH_OUT' then 1 else 0 end ) CASH_OUT, "+
"SUM(case when operation_type='CASH_IN' then 1 else 0 end ) CASH_IN "+
"from pn2a_momo_sim_sw  where to_date(m_date, 'YYYYMMDD') between trunc(:sd) "+
"and trunc(:ed) group by m_date order by m_date";

Queries.prototype.MOMODEPOSITWEEKLY = "select to_char(to_date(m_date,'YYYYMMDD'),'YYYY-MM-DD') m_date, count(*) msisdn from PN2A_MOMO_HU_WEEKLY_DEPOSIT where to_date(m_date, 'YYYYMMDD') between trunc(:sd) "+
        "and trunc(:ed) group by m_date order by m_date";

// HU

Queries.prototype.HU1 = "select to_char(m_date,'YYYY-MM-DD') m_date, count(*) msisdn from HU_CALL where m_date between trunc(:sd) "+
        "and trunc(:ed) group by m_date order by m_date";

Queries.prototype.HU2 = "select to_char(m_date,'YYYY-MM-DD') m_date, count(distinct msisdn) msisdn from HU_CALLS_D where m_date between trunc(:sd) "+
        "and trunc(:ed) group by m_date order by m_date";

Queries.prototype.HU3 = "select to_char(m_date,'YYYY-MM-DD') m_date, count(distinct msisdn) msisdn from HU_CALL_D where m_date between trunc(:sd) "+
        "and trunc(:ed) group by m_date order by m_date";

Queries.prototype.HU4 = "select to_char(m_date,'YYYY-MM-DD') m_date, count(*) msisdn from HU_INT_CALL where m_date between trunc(:sd) "+
        "and trunc(:ed) group by m_date order by m_date";

Queries.prototype.HU9 = "select to_char(m_date,'YYYY-MM-DD') m_date, count(*) msisdn from HU_INT_CALL_D where m_date between trunc(:sd) "+
        "and trunc(:ed) group by m_date order by m_date";

Queries.prototype.HUSMS = "select to_char(m_date,'YYYY-MM-DD') m_date, count(*) msisdn from PN2A_HU_SMS where m_date between trunc(:sd) "+
        "and trunc(:ed) group by m_date order by m_date";

Queries.prototype.SMSC = "select to_char(m_date,'YYYY-MM-DD') m_date, total sms from TOTAL_SMS where m_date between trunc(:sd) "+
        "and trunc(:ed) order by m_date";

Queries.prototype.SMSCBYPASS = "select to_char(SUBMISSIONTIME,'YYYY-MM-DD') m_date, count(*) SMS from pn2a_bypass_smsc where SUBMISSIONTIME between trunc(:sd) "+
        "and trunc(:ed) group by submissiontime order by submissiontime";

Queries.prototype.HUGPRS = "select to_char(m_date,'YYYY-MM-DD') m_date, count(distinct msisdn) msisdn from HU_INT_CALL where m_date between trunc(:sd) "+
        "and trunc(:ed) group by m_date order by m_date";

//---------------------
// Functions which will be available to external callers
module.exports = new Queries();