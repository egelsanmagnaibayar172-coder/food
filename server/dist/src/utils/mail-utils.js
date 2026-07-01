"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserEmail = void 0;
const resend_1 = require("resend");
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
const resend = new resend_1.Resend(process.env.RESEND_API_KEY);
const verifyUserEmail = async (receiver, verifyLink) => {
    try {
        const { data, error } = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: receiver,
            subject: "Burtgel batalgaajlaa",
            html: `
            <div style="font-family: sans-serif; padding: 20px; text-align: center;">
              <h2>Welcome</h2>
              <p>Odoo ter Tom nogoon deer darj Email ee batalgaajuulna uu!</p>
              <a href="${verifyLink}" style="background-color: #4CAF50; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;">
                Mail batalgaajuulah
              </a>
            </div>
          `,
        });
        if (error) {
            console.error("Signup Email Error:", error);
            return { success: false, error };
        }
        return { success: true, data };
    }
    catch (err) {
        console.error("Unexpected Signup Email Error:", err);
        return { success: false, err };
    }
};
exports.verifyUserEmail = verifyUserEmail;
