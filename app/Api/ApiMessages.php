<?php

<<<<< HEAD
namespace App\Api;
>>>>>>> d4e647175215b9fcf1241d3d69baf85ab8880efa

    class ApiMessages
    {

        private $message = [];

        public function __construct(string $message, array $data = [])
        {
            $this->message['message'] = $message;
            $this->message['errors'] = $data;
        }

        public function getMessage()
        {
            return $this->message;
        }
    }

?>
