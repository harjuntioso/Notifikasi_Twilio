<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client as GuzzleClient;
use Twilio\Rest\Client as TwilioClient;

class WhatsAppController
{
    public function sendMessage(Request $request)
    {
        $request->validate([
            'phone' => 'required|string',
            'message' => 'required|string',
        ]);

        $twilio = new TwilioClient(env('TWILIO_SID'), env('TWILIO_AUTH_TOKEN'));

        try {
            $message = $twilio->messages->create(
                "whatsapp:" . $request->phone, // To
                [
                    "from" => "whatsapp:" . env('TWILIO_WHATSAPP_NUMBER'),
                    "body" => $request->message
                ]
            );

            return response()->json([
                'success' => true,
                'message' => 'WhatsApp message sent successfully',
                'sid' => $message->sid
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to send WhatsApp message: ' . $e->getMessage()
            ], 500);
        }
    }
}