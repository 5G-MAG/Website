---
title: Testing 5GMS AS
hide_title: true
sidebar_position: 0
description: Guide to building, configuring and testing the 5GMS Application Server for development, including HTTP/HTTPS setup and the M3 test client.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M7 4v16l13 -8l-13 -8" /></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">5G Media Streaming</span>
<h1>Developing and Testing the 5GMS Application Server</h1>
</div>
</div>

:::tip[In short]
This tutorial allows to: Setup the 5GMSd AS for development and testing; Test the 5GMSd AS with the AF; Test the 5GMSd AS without the AF (but with an M3 client); Configure an HTTP Application Server; Configure an HTTPS Application Server; Test the internal M3 Certificates API; Test the internal M3 ContentHostingConfiguration API.
:::


Here you will find information to assist with development and testing of the Reference Tools 5GMS Application Server (AS).

<img loading="lazy" src="/assets/images/5gms/5GMS_Downlink_AS.png" alt="5GMSd downlink architecture highlighting the Application Server and its M2d, M3 and M4d reference points" /> 

**What you will build:** a local development and testing setup of the 5GMSd Application Server, driven either by the Application Function (over M3) or by the bundled `m3_client_cli.py` test client, serving media over HTTP and HTTPS.

The AS uses three reference points on this page: M2d (content ingest into the AS), M3 (the interface over which the AF, or the test client, configures the AS) and M4d (delivery of media to clients).

For a map of the files in the AS repository, see [Repository file map](#repository-file-map) at the end of this page.

While the instructions in the main project [README](https://github.com/5G-MAG/rt-5gms-application-server#readme) tell
you how to install the 5GMSd Application Server as a system-wide application, during development it is usually more
appropriate to have one or more local clones of the repository that are being used for development and testing. This
page provides details of one suggested way to arrange your development environment to ensure separation from the main
system during development and testing.

<a class="repo-card repo-card--inline" href="https://github.com/5G-MAG/rt-5gms-application-server">
<span class="repo-card__name"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.833.092-.647.35-1.088.636-1.338-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" /></svg>rt-5gms-application-server</span>
<span class="repo-card__role">The Application Server (AS): ingests content at M2d, is configured over M3, and delivers media to clients at M4d.</span>
</a>

## Prerequisites

There are some packages that will need to be installed system wide that the build and install system relies on. These
can usually be installed as system packages.

<div class="spec-chip-row">
<span class="spec-chip"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" /><path d="M8 9l3 3l-3 3" /><path d="M13 15l3 0" /></svg>Git</span>
<span class="spec-chip"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" /><path d="M8 9l3 3l-3 3" /><path d="M13 15l3 0" /></svg>Java</span>
<span class="spec-chip"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" /><path d="M8 9l3 3l-3 3" /><path d="M13 15l3 0" /></svg>Python 3</span>
<span class="spec-chip"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" /><path d="M8 9l3 3l-3 3" /><path d="M13 15l3 0" /></svg>Wget</span>
<span class="spec-chip"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" /><path d="M12 12l8 -4.5" /><path d="M12 12l0 9" /><path d="M12 12l-8 -4.5" /></svg>Python module: pip</span>
<span class="spec-chip"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" /><path d="M12 12l8 -4.5" /><path d="M12 12l0 9" /><path d="M12 12l-8 -4.5" /></svg>Python module: venv</span>
</div>

**Debian/Ubuntu Linux and derivatives**

```bash
sudo apt -y install git default-jdk python3 wget python3-pip python3-venv
```

**RHEL/CentOS/Fedora/Rocky**

```bash
sudo dnf -y install git java-latest-openjdk python3 wget python3-pip python3-venv
```

## Checking out the project code

Since this will be used for development and testing, the instructions here will show you how to check out the latest
development branch. Pick the path that matches what you're doing:

<div class="community-tiles community-tiles--even">
<a class="community-tile" href="#checkout-for-development">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 7m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M12 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M7 9v1a3 3 0 0 0 3 3h4a3 3 0 0 0 3 -3v-1" /><path d="M12 13l0 4" /></svg>
<strong>Checkout for development</strong>
<span class="tile-desc">Fork the repository (keeping the `development` branch as default), then clone your fork.</span>
<span class="tile-cta">For contributing back →</span>
</a>
<a class="community-tile" href="#checkout-for-testing-only">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
<strong>Checkout for testing only</strong>
<span class="tile-desc">Clone the 5G-MAG repository directly on the `development` branch.</span>
<span class="tile-cta">Quickest path →</span>
</a>
</div>

### Checkout for development

1. **Create a fork**
    1. Login to GitHub ([create a GitHub account](https://github.com/join)
       and [set an SSH key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)
       if you haven't already done so).
    1. On the main [GitHub project page](https://github.com/5G-MAG/rt-5gms-application-server) click on the "Fork" label
       in the top right of the page, then untick "Copy the `main` branch only" on the page that appears and select the "
       Create fork" button.
    1. On your new fork page select the `Settings` option just below the main repository title. Then select "Branches"
       under the "Code and automation" topic from the sections on the left, and edit the "Default branch" to change it
       to `development`.
    1. Clone the repository
       ```bash
       cd
       git clone --recurse-submodules git@github.com:<your-github-user>/rt-5gms-application-server.git
       ```
       Where `<your-github-user>` is the username of your GitHub login.

### Checkout for testing only

1. **Clone the 5G-MAG repository**
   ```bash
   cd
   git clone -b development --recurse-submodules https://github.com/5G-MAG/rt-5gms-application-server.git
   ```

## Creating the virtual Python environment

By using a Python virtual environment you can use upgraded versions of existing system Python modules and automatically
install project module dependencies without having to install or upgrade modules system wide.

1. Create the virtual Python environment

   ```bash
   cd ~/rt-5gms-application-server
   python3 -m venv venv
   ```

1. Update base modules and test script dependencies

   ```bash
   cd ~/rt-5gms-application-server
   venv/bin/python3 -m pip install --upgrade pip build setuptools docopt PyYAML
   ```

## Build and install the 5GMSd Application Server

```bash
cd ~/rt-5gms-application-server
venv/bin/python3 -m pip install .
```

## Create a local-user friendly configuration

Save these configuration file contents as `~/rt-5gms-application-server/local-dev.conf`:

```ini
### Defaults for the Reference Tools: 5GMSd applications
[DEFAULT]
log_dir = /tmp/rt-5gms-as/logs
run_dir = /tmp/rt-5gms-as

### 5GMSd Application Server specific configurations
[5gms_as]
log_level = debug
cache_dir = /tmp/rt-5gms-as/cache
certificates_cache = /tmp/rt-5gms-as/certificates
http_port = 8080
https_port = 8443
#m3_listen = localhost
#m3_port = 7777
#access_log = %(log_dir)s/application-server-access.log
#error_log = %(log_dir)s/application-server-error.log
#pid_path = %(run_dir)s/application-server.pid

### 5GMSd Application Server nginx specific configuration
[5gms_as.nginx]
root_temp = /tmp/rt-5gms-as
#client_body_temp = %(root_temp)s/client-body-tmp
#proxy_temp = %(root_temp)s/proxy-tmp
#fastcgi_temp = %(root_temp)s/fastcgi-tmp
#uwsgi_temp = %(root_temp)s/uwsgi-tmp
#scgi_temp = %(root_temp)s/scgi-tmp
#pid_path = %(root_temp)s/5gms-as-nginx.pid
```

:::caution[M4d ports below 1024 need root]
When you run the AS as an unprivileged user, the M4d distribution service cannot bind to the default ports 80 and 443 (ports below 1024 require root). This configuration uses ports 8080 and 8443 instead. Any URL the AF publishes for M4d will therefore need the port inserted manually before use. For example, change `http://your.hostname/...` to `http://your.hostname:8080/...`.
:::

Using this configuration will:

- Place all 5GMSd Application Server cache directories and other temporary files and logs under the `/tmp/rt-5gms-as`
  directory for testing.
- Change the default ports used for the 5GMSd distribution service at reference point M4d. Note that this means that all
  URLs output by the 5GMSd Application Function with respect to M4d will need to be manually modified to insert the new
  port numbers before use, e.g. if the AF publishes a URL starting `http://your.hostname/...` you will need to change
  that to `http://your.hostname:8080/...` in order to use the URL. This is necessary as the default ports of 80 and 443
  are not available to normal unprivileged users. A normal user has to use ports with a number greater than 1024.
- Turn on `debug` level output from the 5GMSd Application Server in order to better see what is happening.
- Some settings above are commented out but may be useful while testing and so have been left in with their default
  values and prefixed with `#` to comment them out. If you wish to change one then remove the `#` and change the value
  to your desired setting.

## Running the installed 5GMSd Application server

To run the version of the 5GMSd Application Server installed in the virtual environment with the `local-dev.conf`
configuration (above), use:

```bash
cd ~/rt-5gms-application-server
PATH="/usr/local/openresty/nginx/sbin:$PATH" venv/bin/5gms-application-server -c local-dev.conf
```

## Testing

The following sections cover running and testing the Application Server — pick the path that fits what you're doing:

<div class="community-tiles community-tiles--even">
<a class="community-tile" href="#running-the-example-without-building">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 4v16l13 -8l-13 -8" /></svg>
<strong>Run without building</strong>
<span class="tile-desc">Run the AS directly from source with `python3 -m rt_5gms_as.app`, ready for M3 configuration.</span>
<span class="tile-cta">Fastest for local iteration →</span>
</a>
<a class="community-tile" href="#testing-with-the-application-function">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 7m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M5 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M19 9v1a2 2 0 0 1 -2 2h-8a2 2 0 0 0 -2 2v1" /></svg>
<strong>Testing with the Application Function</strong>
<span class="tile-desc">Drive the AS from a real, locally running 5GMS Application Function over M3.</span>
<span class="tile-cta">Closest to production →</span>
</a>
<a class="community-tile" href="#testing-without-the-application-function">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" /><path d="M8 9l3 3l-3 3" /><path d="M13 15l3 0" /></svg>
<strong>Testing without the Application Function</strong>
<span class="tile-desc">Configure the AS directly with the bundled `m3_client_cli.py` test script — no AF required.</span>
<span class="tile-cta">No AF required →</span>
</a>
</div>

## Running the example without building

Make sure that git, java, wget and nginx are installed on the local system and
can be found on the current command path (`$PATH`).

```bash
sudo apt install git wget nginx default-jdk python3-regex
```

Generate the OpenAPI python modules (these are not part of the source
distribution). Read documentation below on "Regenerating the 5G API bindings":

```bash
cd ~/rt-5gms-application-server
build_scripts/generate_5gms_as_openapi
```

Create a configuration to run the application server as a local, unprivileged,
user.

```bash
mkdir ~/.rt_5gms
cat > ~/.rt_5gms/application-server.conf <<EOF
[DEFAULT]
log_dir = /tmp/rt-5gms-as/logs
run_dir = /tmp/rt-5gms-as

### 5GMS Application Server specific configurations
[5gms_as]
log_level = info
cache_dir = /tmp/rt-5gms-as/cache
certificates_cache = /tmp/rt-5gms-as/certificates
http_port = 8080
https_port = 8443
m3_listen = localhost
m3_port = 7777
m4d_path_prefix = /m4d/provisioning-session-{provisioningSessionId}/

### 5GMS Application Server nginx specific configuration
[5gms_as.nginx]
root_temp = /tmp/rt-5gms-as
EOF
mkdir -p /tmp/rt-5gms-as/cache
mkdir /tmp/rt-5gms-as/logs
```

Run the example directly:

```bash
cd ~/rt-5gms-application-server/src
python3 -m rt_5gms_as.app
```

This will start nginx with a default configuration that will respond with a 404 to any request
on http://localhost:8080/.

At this point the 5GMS Application Server is ready for configuration by an M3 client such as the 5GMS Application
Function or the `m3_client_cli.py` test script.

## Testing with the Application Function

1. Install both the 5GMS Application Server and Application Function.
    * To install the 5GMS Application Server follow either the sdist, direct from source or in a virtual environment
      instructions from the Installing section of the main README.
    * To install the 5GMS Application Function follow the directions to install the dependencies, retrieve, build and
      install the 5GMS Application Function from
      the [5GMS Application Function documentation](https://github.com/5G-MAG/rt-5gms-application-function#install-dependencies).

2. Configure the Application Function with the M3 port number of the Application Server (i.e. 7777) in the
   `msaf.applicationServers` section of the `msaf.yaml` file. This is an example `applicationServers` entry from the
   `msaf.yaml` configuration file with the `m3Port` set.

    ```yaml
        msaf:
            applicationServers:
                -   canonicalHostname: localhost
                    urlPathPrefixFormat: /m4d/provisioning-session-{provisioningSessionId}/
                    m3Port: 7777
    ```

3. In one terminal window, start the Application Server. use the command `5gms-application-server`

4. In another terminal window, start the Application Function. Use the command
   `~/rt-5gms-application-function/install/bin/open5gs-msafd`

The Application Function should then configure the Application Server using the Server Certificates and Content Hosting
Configuration it has been configured with. This should be evident from log messages from the Application Server and
Application Function and from the /tmp/rt_5gms_as.conf NGINX configuration.

See the 5GMS Application Function documentation for more details on configuring it with Certificates and a Content
Hosting Configuration.

## Testing without the Application Function

To enable debugging and testing, a simple M3 client command can be found in the `tests` subdirectory:

```bash
Usage:
    m3_client_cli.py -h | --help
    m3_client_cli.py -c | --certificate <connect>
    m3_client_cli.py -c | --certificate <connect> (add|update) <certificate-id> <pem-file>
    m3_client_cli.py -c | --certificate <connect> delete <certificate-id>
    m3_client_cli.py -H | --content-hosting-configuration <connect>
    m3_client_cli.py -H | --content-hosting-configuration <connect> (add|update) <provisioning-session-id> <content-hosting-configuration-json-file>
    m3_client_cli.py -H | --content-hosting-configuration <connect> delete <provisioning-session-id>
    m3_client_cli.py -H | --content-hosting-configuration <connect> purge <provisioning-session-id> [<pattern>]

Parameters:
    connect                  Hostname:Port of the server providing M3.
    provisioning-session-id  Provisioning Session Identifier.
    certificate-id           Certificate Identifier.
    pem-file                 Server PEM format X.509 public certificate, private key and intermediate CA certificates.
    content-hosting-configuration-json-file
                             Filename of a ContentHostingConfiguration in JSON format.
    pattern                  Regular expression to match the cache entry URL paths to delete.

Options:
    -h --help                Display the command help
    -v --version             Display command version
    -c --certificate         List known certificates or perform a certificate operation.
    -H --content-hosting-configuration
                             List known ContentHostingConfigurations or perform an operation on ContentHostingConfigurations.
```

This can be used instead of the AF to configure a running AS.

### Prerequisite packages

These testing scripts require a few more Python 3 modules to be installed, beyond what is brought in as requirements
when the application server is installed.

The extra modules are: `docopt`, `aiofiles` and `httpx[http2]`.

These can be installed on ubuntu using:

```bash
apt install python3-docopt python3-aiofiles python3-httpx python3-h2
```

...or on most distributions by using the python `pip` module:

```
python3 -m pip install docopt aiofiles 'httpx[http2]'
```

### Running the Application Server for testing with `m3_client_cli.py`

When running any of the following tests the Application Server must be running first. The exact command will depend on
how you installed the Application Server or whether you
are [running directly without building](#running-the-example-without-building).

#### Running from a virtual Python environment installation

If the AS you are testing has been installed in a virtual Python environment, as described in
the [Development and Testing](https://github.com/5G-MAG/rt-5gms-application-server/wiki/Development-and-Testing) wiki
page, then you would simply run the AS from the virtual environment using your local configuration file. For example:

```bash
cd ~/rt-5gms-application-server
venv/bin/5gms-application-server -c local-dev.conf
```

#### Running a system wide AS installation

If the Application Server under test has been installed as a system process, using a command like
`sudo python3 -m pip install .` or `sudo python3 -m pip install rt-5gms-application-server-1.X.X.tar.gz`, then you can
run the AS as root. For example:

```bash
sudo 5gms-application-server
```

### To configure a simple HTTP Application Server

Make sure the AS is running first (see ["Running the Application Server for testing with
`m3_client_cli.py`"](#running-the-application-server-for-testing-with-m3_client_clipy) above).

```bash
cd ~/rt-5gms-application-server
tests/m3_client_cli.py -H localhost:7777 add ps1 tests/examples/ContentHostingConfiguration_Big-Buck-Bunny_pull-ingest.json
```

This should respond with a "Success!" message, and NGINX should now be running on port 8080 using the example Big Buck
Bunny configuration. You can check the NGINX configuration in `/tmp/rt_5gms_as.conf`.

### To configure an HTTPS Application Server

Make sure the AS is running first (see ["Running the Application Server for testing with
`m3_client_cli.py`"](#running-the-application-server-for-testing-with-m3_client_clipy) above).

This requires that the server certificate is pushed to the Application Server before the content hosting configuration
is.

To generate server certificates, ensure that `openssl` is installed (e.g. `apt -y install openssl`), and then:

```bash
cd ~/rt-5gms-application-server
external/rt-common-shared/5gms/scripts/make_self_signed_certs.py tests/examples/ContentHostingConfiguration_Big-Buck-Bunny_pull-ingest_https.json tests/examples/Certificates.json
```

The 5GMS Application Server stores the certificates it has been configured with in a certificates cache. This cache is
reloaded when the Application Server starts up, so it will remember certificates from previous runs.

The 5GMS Application Server can be checked for what certificates it already has by using the command:

```bash
cd ~/rt-5gms-application-server
tests/m3_client_cli.py -c localhost:7777
```

To push a new certificate (with id "testcert1" using the generated certificate file):

```bash
cd ~/rt-5gms-application-server
tests/m3_client_cli.py -c localhost:7777 add testcert1 tests/examples/certificate-1.pem
```

...or to update an existing certificate:

```bash
cd ~/rt-5gms-application-server
tests/m3_client_cli.py -c localhost:7777 update testcert1 tests/examples/certificate-1.pem
```

Now the Content Hosting Configuration can be pushed:

```bash
cd ~/rt-5gms-application-server
tests/m3_client_cli.py -H localhost:7777 add ps1 tests/examples/ContentHostingConfiguration_Big-Buck-Bunny_pull-ingest_https.json
```

This should result in "Success!" and NGINX will now be listening on "https://localhost:8443/...".

To start both HTTPS and HTTP reverse proxies for the Big Buck Bunny content, substitute the ContentHostingConfiguration
above for the `tests/examples/ContentHostingConfiguration_Big-Buck-Bunny_pull-ingest_http_and_https.json` file, or
update the configuration using:

```bash
cd ~/rt-5gms-application-server
tests/m3_client_cli.py -H localhost:7777 update ps1 tests/examples/ContentHostingConfiguration_Big-Buck-Bunny_pull-ingest_http_and_https.json
```

Note: Following these instructions will create a self-signed certificate for localhost in
`~/rt-5gms-application-server/tests/examples/certificate-1.pem`, this certificate will not pass normal CA verification
so to access the URL you need to turn off SSL validation or accept the self-signed certificate in your browser or media
player application.

<div class="tutorial-complete">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2l4 -4" /><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9" /></svg>
<div><strong>You now have a working, tested 5GMSd Application Server.</strong> It's serving media over both HTTP and HTTPS, configured directly via the bundled `m3_client_cli.py` test client — no Application Function required.</div>
</div>

## Runtime configuration

The 5GMSd Application Server is configured at run-time for distribution of media via the interface at reference point
M3. This is usually done by the [5GMSd Application Function](https://github.com/5G-MAG/rt-5gms-application-function),
but this project also contains a simple M3 client that can be used to push run-time configuration for testing.

### M3 test client

This client script provides a simple command line interface to issue M3 API calls and see the result from the response.

The script can be run as:

```bash
cd ~/rt-5gms-application-server
tests/m3_client_cli.py -h|{<command> <hostaddr:port> [<command-parameters>...]}
```

If the default values for `m3_listen` and `m3_port` are used in the configuration file the `<hostaddr:port>` will be
`localhost:7777`.

To see the command line help use:

```bash
cd ~/rt-5gms-application-server
tests/m3_client_cli.py -h
```

### M3 Certificates API

#### List known certificates

```bash
cd ~/rt-5gms-application-server
tests/m3_client_cli.py -c localhost:7777
```

#### Add a new certificate

```bash
cd ~/rt-5gms-application-server
tests/m3_client_cli.py -c localhost:7777 add testcert1 tests/examples/certificate-1.pem
```

#### Update an existing certificate

```bash
cd ~/rt-5gms-application-server
tests/m3_client_cli.py -c localhost:7777 update testcert1 tests/examples/certificate-1.pem
```

#### Delete a certificate

```bash
cd ~/rt-5gms-application-server
tests/m3_client_cli.py -c localhost:7777 delete testcert1
```

### M3 ContentHostingConfiguration API

#### List known ContentHostingConfigurations

```bash
cd ~/rt-5gms-application-server
tests/m3_client_cli.py -H localhost:7777
```

#### Add a new ContentHostingConfiguration

```bash
cd ~/rt-5gms-application-server
tests/m3_client_cli.py -H localhost:7777 add prov-sess-1 tests/examples/ContentHostingConfiguration_Big-Buck-Bunny_pull-ingest_http_and_https.json
```

#### Update an existing ContentHostingConfiguration

```bash
cd ~/rt-5gms-application-server
tests/m3_client_cli.py -H localhost:7777 update prov-sess-1 tests/examples/ContentHostingConfiguration_Big-Buck-Bunny_pull-ingest_https.json
```

#### Delete a ContentHostingConfiguration

```bash
cd ~/rt-5gms-application-server
tests/m3_client_cli.py -H localhost:7777 delete prov-sess-1
```

#### Purge all cached objects for a ContentHostingConfiguration

```bash   
cd ~/rt-5gms-application-server
tests/m3_client_cli.py -H localhost:7777 purge prov-sess-1
```

### Purge cached objects using a path regex for a ContentHostingConfiguration

For example to purge all DASH manifests:

```bash   
cd ~/rt-5gms-application-server
tests/m3_client_cli.py -H localhost:7777 purge prov-sess-1 '\.mpd$'
```

## Regenerating the 5G API bindings

The `build_scripts/generate_5gms_as_openapi` script will use wget, git and java to download the openapi-generator tool,
the 5G OpenAPI YAML and generate the `rt_5gms_as.openapi_5g` Python module package. The script will only do this if the
`src/rt_5gms_as/openapi_5g` directory does not already exist.

Therefore to regenerate the API bindings you first need to remove the old bindings:

```bash
cd ~/rt-5gms-application-server
rm -rf src/rt_5gms_as/openapi_5g
```

Then run the generator script:

```bash
~/rt-5gms-application-server/build_scripts/generate_5gms_as_openapi
```

For reference (or if it is desirable to recreate the steps manually) the `generate_5gms_as_openapi` script performs the
following actions:

- Uses `wget` to fetch version 7.9.0 of
  the [openapi-generator-cli](https://github.com/OpenAPITools/openapi-generator-cli).
    - e.g.
      `wget https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/7.9.0/openapi-generator-cli-7.9.0.jar -O openapi-generator-cli.jar`
- Uses `git` to clone the [5G OpenAPI repository](https://forge.3gpp.org/rep/all/5G_APIs.git).
    - e.g. `git clone -b REL-17 https://forge.3gpp.org/rep/all/5G_APIs.git`
- Copies in the API override files
    - e.g.
      `cp -f ~/rt-5gms-application-server/external/rt-common-shared/5gms/5G_APIs-overrides/*.yaml ~/rt-5gms-application-server/build_scripts/M3_merged.yaml 5G_APIs/`
- Uses the openapi-generator-cli, downloaded in the first step, to generate the API bindings.
    - e.g.
      `mkdir 5g-api-python; java -jar openapi-generator-cli.jar generate -i 5G_APIs/TS26512_M1_ContentHostingProvisioning.yaml -g python --additional-properties packageName=rt_5gms_as.openapi_5g,projectName=openapi-5g -o 5g-api-python; java -jar openapi-generator-cli.jar generate -t ~/rt-5gms-application-server/build_scripts -i 5G_APIs/M3_merged.yaml -g python --additional-properties packageName=rt_5gms_as.openapi_5g,projectName=openapi-5g -o 5g-api-python`
- Copies the API Python package to the `src/rt_5gms_as/openapi_5g` directory.

## Repository file map

Files in the 5GMS AS repository include:

- `ATTRIBUTION_NOTICE` - List of 3rd party software used when running the 5GMS application server.
- `LICENSE`            - The software license for this project.
- `README.md`          - Project README file.
- `pyproject.toml`     - The Python project description for building and installing the application.
- `build_scripts/`     - Scripts used when building the python project.
    - `api.mustache` - openapi-generator template file to pass operations onto methods in the class defined in
      src/rt_5gms_as/server.py.
    - `backend.py` - build backend wrapper to trigger extra build actions.
    - `generate_5gms_as_openapi` - Will generate the OpenAPI python modules if not already present.
    - `M3_merged.yaml` - OpenAPI YAML wrapper file to merge the M3 interface files into one for API bindings generation.
    - `openapi-generator-config.yaml.in` - openapi-generator configuration file template.
- `docs/`              - Development documentation and examples.
    - `example-application-server.conf` - An application configuration which documents the defaults and meaning for each
      application configuration option.
- `external/`          - Directory containing submodule mount points.
    - `rt-common-shared/` - The common shared examples and scripts.
- `src/`               - The application source modules.
    - `rt_5gms_as/` - The main Python module for this application
        - `app.py` - Application entry point.
        - `exceptions.py` - Application specific Exception class definitions.
        - `context.py` - Module for the application Context class.
        - `openapi_5g/` - Python bindings generated by openapi-generator-cli from the 5G APIs. Note: This directory is
          not present in the tree until `build_scripts/generate_openapi` is run.
        - `proxies/` - Contains the web server/proxy detection and configuration classes and any data files they need.
        - `proxy_factory.py` - Factory module to pick a suitable web server/proxy.
        - `server.py` - M3 Server implementation.
        - `utils.py` - Common utility functions for the web server/proxy classes.
- `tests/`             - Regression and build acceptance tests and other testing tools.
    - `examples/` - Example configurations to go along with the tests.

## Next steps

- Test the Application Function: [Testing the 5GMS Application Function](./testing-AF).
- Put the AS into a full deployment: [5G MSd End-to-End deployment (with Docker)](./end-to-end).
- Return to the [Tutorials index](.).
