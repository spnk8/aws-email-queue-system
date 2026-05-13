import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({
  region: "ap-southeast-2",
});

export const handler = async (event) => {
  console.log("EVENT:", JSON.stringify(event));

  for (const record of event.Records) {
    const body = JSON.parse(record.body);

    console.log("MESSAGE:", body);

    const params = {
      Source: "suphanut8inkong@gmail.com",
      Destination: {
        ToAddresses: [body.email],
      },

      Message: {
        Subject: {
          Data: "Welcome to AWS Queue System",
        },

        Body: {
          Text: {
            Data: `Hello ${body.email},
            
Your signup was successful.

This email was processed asynchronously using AWS SQS + Lambda.`,
          },
        },
      },
    };

    try {
      const command = new SendEmailCommand(params);

      const result = await ses.send(command);

      console.log("EMAIL SENT:", result);
    } catch (error) {
      console.error("SEND EMAIL ERROR:", error);

      throw error;
    }
  }

  return {
    statusCode: 200,
  };
};
