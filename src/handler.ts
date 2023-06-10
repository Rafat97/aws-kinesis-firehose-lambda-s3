import {
  FirehoseTransformationEventRecord,
  KinesisStreamHandler,
} from "aws-lambda";

export const preprocess = async (event: any, context: any, callback: any) => {
  const records: any = [];
  for (let i = 0; i < event.records.length; i++) {
    let payload: any = Buffer.from(event.records[i].data, "base64").toString(
      "utf-8"
    );
    // console.log(`PAYLOAD: ${JSON.stringify({ payload })}`);
    payload = JSON.parse(payload);
    payload.decoded = true;
    payload.timestamp = Date.now();
    // console.log(payload);
    records.push({
      recordId: event.records[i].recordId,
      result: "Ok",
      data: Buffer.from(JSON.stringify(payload)).toString("base64"),
    });
  }
  return { records };
};
