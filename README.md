# NFC Dashboard

This is a **Node.js** project that implements **IoT integration** with **Odoo ERP (version 14)** using the Odoo external API. It provides a **real-time dashboard** to display the status of all IoT devices listed in the Odoo object model.

## Features

- **Real-time updates** using `socket.io` and `mqtt`.
- Integration with **Odoo ERP** via `odoo-xmlrpc`.
- Built with `express`, `http`, and `fs`.
- Optional support for **feather-icons** for enhanced visuals.

## Installation

1. Clone this repository:
    ```bash
    git clone https://github.com/Muezhan/odoo14-mqtt-dashboard.git
    ```
2. Navigate to the project directory:
    ```bash
    cd nfc_dashboard
    ```
3. Run the application:
    ```bash
    node node.js
    ```

## Requirements

- **Node.js** installed on your system.
- Odoo ERP (version 14) with IoT devices configured.

## Usage

- Start the application using the command above.
- Access the real-time dashboard in your browser to monitor IoT device statuses.

## Dependencies

- `express`
- `socket.io`
- `mqtt`
- `http`
- `fs`
- `odoo-xmlrpc`
- (Optional) `feather-icon`


## License

This project is licensed under the [MIT License](LICENSE).

Feel free to contribute or report issues!  