
import * as sendgrid from "https://deno.land/x/sendgrid@0.0.3/mod.ts";

export interface Email
{
    from: string;
    to: string[];
    subject: string | undefined;
    text: string | undefined;
    html: string | undefined;
}
export interface EmailResult
{
    success: boolean;
    errors: string[] | undefined;
}

export class Resolvers
{
    private sendgridKey: string;
    constructor(env: Record<string, string>)
    {
        this.sendgridKey = env.SENDGRID_KEY;
    }
    public request(): string
    {
        return "response";
    }
    public async sendEmail({ email }: { email: Email; }): Promise<EmailResult>
    {
        const to: { email: string; }[] = email.to.map(function (recipient) { return { email: recipient }; });
        email.text ?? (email.text = "(no body)");
        email.html ?? (email.html = email.text);
        const mail: sendgrid.IRequestBody =
        {
            from: { email: email.from },
            personalizations: [{ subject: email.subject ?? "(no subject)", to: to }],
            content:
                [
                    { type: "text/plain", value: email.text },
                    { type: "text/html", value: email.html },
                ]
        };
        const result = await sendgrid.sendMail(mail, { apiKey: this.sendgridKey });
        return { success: result.success, errors: result.errors };
    }
}