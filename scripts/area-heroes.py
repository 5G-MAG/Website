"""Hero animations for the solution pages (Real-Time Communications, Broadcast and Multicast, Non-Terrestrial
Networks, Immersive Media, Connected Media Production), in the style of the Content Delivery hero.

Usage:  python3 scripts/area-heroes.py [path to website-graphics]

Writes src/components/ShowcaseDiagram/areaHeroes.js. It imports the drawing helpers (phone, tower, server, packets,
route, ...) from showcase_diagrams.py of the graphics repo, by default ~/admin/admin-graphics/website-graphics. The
scenes are SMIL animations, so they run without script; ShowcaseDiagram pauses them for visitors who ask for reduced
motion. They carry no numbers, names or logos.
"""
import json
import os
import pathlib
import sys

GRAPHICS = (sys.argv[1] if len(sys.argv) > 1 else os.path.expanduser('~/admin/admin-graphics/website-graphics'))
sys.path.insert(0, GRAPHICS)
import showcase_diagrams as sd  # noqa: E402  (only its module-level definitions run)

C, W, D, M, G, A = sd.C, sd.W, sd.D, sd.M, sd.G, sd.A
RED = '#E5533D'
t, pill, route, packets = sd.t, sd.pill, sd.route, sd.packets
phone, tower, server, tv = sd.phone, sd.tower, sd.server, sd.tv


def blink(dur=1.4, lo=.25, begin=0):
    return f'<animate attributeName="opacity" values="1;{lo};1" dur="{dur}s" begin="{begin}s" repeatCount="indefinite"/>'


def zone(x, y, w, h, label=None, lx=None, ly=None):
    out = f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="18" fill="{M}" stroke="{W}" stroke-opacity=".45" stroke-dasharray="6 6"/>'
    if label:
        out += t(lx if lx is not None else x + w / 2, ly if ly is not None else y + 18, label, 10)
    return out


def bubble(x, y, begin, dur=4):
    """A speech bubble with three dots that lights up in turn."""
    return (f'<g opacity=".25"><animate attributeName="opacity" values=".25;1;1;.25;.25" keyTimes="0;.08;.45;.55;1" dur="{dur}s" begin="{begin}s" repeatCount="indefinite"/>'
            f'<rect x="{x}" y="{y}" width="44" height="26" rx="13" fill="{W}"/><path d="M{x+10} {y+25} l-4 8 l12 -8z" fill="{W}"/>'
            + ''.join(f'<circle cx="{x+13+i*9}" cy="{y+13}" r="2.6" fill="{D}"/>' for i in range(3)) + '</g>')


# ---------------------------------------------------------------- Real-Time Communications
def rtc():
    a_up = 'M80 150 C 150 118, 330 118, 400 150'
    b_dn = 'M400 176 C 330 208, 150 208, 80 176'
    sig_l = 'M52 110 C 62 52, 150 36, 214 36'
    sig_r = 'M266 36 C 330 36, 418 52, 428 110'
    body = (zone(124, 92, 232, 130, '5G network', 240, 112)
            + route(a_up) + route(b_dn) + route(sig_l, A, '3 6') + route(sig_r, A, '3 6')
            + packets(a_up, 4, 1.8) + packets(b_dn, 4, 1.8) + packets(sig_l, 2, 3.2, A, 3) + packets(sig_r, 2, 3.2, A, 3)
            + phone(30, 104, .85, play=False) + phone(404, 104, .85, play=False)
            + f'<rect x="35" y="116" width="36" height="22" rx="3" fill="{C}" fill-opacity=".85"/><circle cx="53" cy="127" r="6" fill="{W}" fill-opacity=".9"/>'
            + f'<rect x="409" y="116" width="36" height="22" rx="3" fill="{C}" fill-opacity=".85"/><circle cx="427" cy="127" r="6" fill="{W}" fill-opacity=".9"/>'
            + bubble(24, 60, 0) + bubble(412, 60, 2)
            + server(220, 14, .5) + pill(240, 70, 'session setup', 96).replace(f'fill="{A}"', f'fill="{A}"')
            + t(53, 214, 'caller', 11) + t(427, 214, 'caller', 11)
            + t(240, 168, 'live media, both ways', 11, op='1', bold=True)
            + f'<rect x="196" y="244" width="88" height="20" rx="10" fill="{G}"/>' + t(240, 258, 'low delay', 10, col=D, op='1', bold=True))
    return sd.svg(body, '0 0 480 310')


# ---------------------------------------------------------------- Broadcast and Multicast
def bcast():
    rings = ''.join(
        f'<circle cx="240" cy="78" r="10" fill="none" stroke="{C}" stroke-width="2.5" opacity="0">'
        f'<animate attributeName="r" from="10" to="150" dur="3.6s" begin="{-i*1.2:.1f}s" repeatCount="indefinite"/>'
        f'<animate attributeName="opacity" values=".7;0" dur="3.6s" begin="{-i*1.2:.1f}s" repeatCount="indefinite"/></circle>' for i in range(3))
    targets = [(78, 214), (176, 222), (270, 222), (372, 214)]
    r_to = [f'M240 112 C {240 + (x - 240) * .2:.0f} 150, {x + 20} 170, {x + 20} 206' for x, _ in targets]
    r_srv = 'M96 84 L 208 84'
    r_rep = 'M60 170 C 70 262, 200 262, 276 244'
    body = (f'<clipPath id="cp"><rect width="480" height="310"/></clipPath><g clip-path="url(#cp)">{rings}</g>'
            + ''.join(route(r) for r in r_to) + route(r_srv) + route(r_rep, A, '3 6')
            + ''.join(packets(r, 3, 2.4) for r in r_to) + packets(r_srv, 3, 1.8) + packets(r_rep, 3, 3.4, A, 3.5)
            + server(14, 62, .6) + t(38, 130, 'media service', 10)
            + tower(240, 54, .85)
            + tv(46, 214) + phone(166, 204, .5) + phone(260, 204, .5) + tv(344, 214)
            + f'<circle cx="287" cy="236" r="9" fill="{A}"/><path d="M283 236 l3 3 l6 -7" stroke="{D}" stroke-width="2.4" fill="none" stroke-linecap="round"/>'
            + t(240, 24, 'broadcast what is common', 11, op='1', bold=True)
            + f'<rect x="66" y="270" width="126" height="20" rx="10" fill="{A}"/>' + t(129, 284, 'unicast where needed', 10, col=D, op='1', bold=True)
            + t(400, 296, 'everyone receives the same', 10))
    return sd.svg(body, '0 0 480 310')


# ---------------------------------------------------------------- Non-Terrestrial Networks
def ntn():
    """LEO satellites pass overhead one after another. Each one serves the ground while it is over the middle of the
    sky, so the service is handed from one satellite to the next."""
    p0, p1, p2, p3 = (-40, 96), (130, 6), (350, 6), (520, 96)
    n = 90
    dur = 12
    pts = []
    for k in range(n + 1):
        u = k / n
        x = (1 - u) ** 3 * p0[0] + 3 * (1 - u) ** 2 * u * p1[0] + 3 * (1 - u) * u ** 2 * p2[0] + u ** 3 * p3[0]
        y = (1 - u) ** 3 * p0[1] + 3 * (1 - u) ** 2 * u * p1[1] + 3 * (1 - u) * u ** 2 * p2[1] + u ** 3 * p3[1]
        pts.append((x, y))
    path = f'M{p0[0]} {p0[1]} C {p1[0]} {p1[1]}, {p2[0]} {p2[1]}, {p3[0]} {p3[1]}'
    kt = ';'.join(f'{k / n:.4f}' for k in range(n + 1))
    phases = [0, 1 / 3, 2 / 3]

    def rot(seq, ph):
        k = int(round(ph * n)) % n
        full = seq[:-1]  # the loop repeats, so drop the duplicate end point
        r = full[k:] + full[:k]
        return r + [r[0]]

    def satellite(ph):
        return (f'<g><animateMotion dur="{dur}s" begin="{-ph * dur:.2f}s" repeatCount="indefinite" path="{path}"/>'
                f'<rect x="-8" y="-5" width="16" height="10" rx="2" fill="{D}" stroke="{W}" stroke-width="1.5"/>'
                f'<rect x="-27" y="-3.5" width="17" height="7" rx="1.5" fill="{C}" fill-opacity=".9" stroke="{W}" stroke-opacity=".7"/>'
                f'<rect x="10" y="-3.5" width="17" height="7" rx="1.5" fill="{C}" fill-opacity=".9" stroke="{W}" stroke-opacity=".7"/>'
                f'<path d="M0 5 L0 9" stroke="{W}" stroke-width="1.5"/><circle cx="0" cy="10" r="1.8" fill="{A}">{blink(1.1)}</circle></g>')

    def beam(ph, tx, ty, col=C):
        xs = rot([x for x, _ in pts], ph)
        ys = rot([y for _, y in pts], ph)
        # the beam is drawn only while the satellite is over the middle of the sky
        vis = [1 if 150 < x < 330 else 0 for x in xs]
        return (f'<line x1="{xs[0]:.1f}" y1="{ys[0]:.1f}" x2="{tx}" y2="{ty}" stroke="{col}" stroke-width="2" stroke-dasharray="5 6" stroke-opacity=".85">'
                f'<animate attributeName="x1" values="{";".join(f"{v:.1f}" for v in xs)}" keyTimes="{kt}" dur="{dur}s" repeatCount="indefinite"/>'
                f'<animate attributeName="y1" values="{";".join(f"{v:.1f}" for v in ys)}" keyTimes="{kt}" dur="{dur}s" repeatCount="indefinite"/>'
                f'<animate attributeName="opacity" values="{";".join(str(v) for v in vis)}" keyTimes="{kt}" dur="{dur}s" calcMode="discrete" repeatCount="indefinite"/>'
                f'<animate attributeName="stroke-dashoffset" from="0" to="-22" dur="1s" repeatCount="indefinite"/></line>')

    stars = ''.join(f'<circle cx="{x}" cy="{y}" r="1.6" fill="{W}" opacity=".4">{blink(2 + (x % 3) * .7, .1, -(x % 5) * .4)}</circle>'
                    for x, y in ((60, 30), (118, 52), (196, 24), (290, 44), (352, 22), (416, 40), (452, 20), (24, 62)))
    ground = (f'<path d="M0 262 Q 240 214 480 262 L480 310 L0 310Z" fill="{D}" fill-opacity=".55"/>'
              f'<path d="M0 262 Q 240 214 480 262" stroke="{W}" stroke-opacity=".5" stroke-width="2" fill="none"/>')
    body = (stars + ground
            + ''.join(beam(ph, 150, 176) + beam(ph, 372, 214) + beam(ph, 300, 232, A) for ph in phases)
            + ''.join(satellite(ph) for ph in phases)
            + tower(150, 168, .6) + t(150, 276, 'ground station', 10)
            + phone(354, 214, .4) + phone(284, 226, .36, play=False)
            + f'<rect x="288" y="237" width="12" height="5" rx="2.5" fill="{W}" fill-opacity=".9"/>'
            + t(372, 268, 'device', 10) + t(298, 282, 'remote area', 9.5)
            + server(24, 196, .45) + t(44, 262, 'network core', 9.5)
            + route('M68 214 L 132 214') + packets('M68 214 L 132 214', 3, 2))
    return sd.svg(body, '0 0 480 310')


# ---------------------------------------------------------------- Immersive Media
def cube(cx, cy, s, fill_op=.9, anim=True):
    top = f'M{cx} {cy-s} L{cx+s*.87} {cy-s*.5} L{cx} {cy} L{cx-s*.87} {cy-s*.5}Z'
    left = f'M{cx-s*.87} {cy-s*.5} L{cx} {cy} L{cx} {cy+s} L{cx-s*.87} {cy+s*.5}Z'
    right = f'M{cx+s*.87} {cy-s*.5} L{cx} {cy} L{cx} {cy+s} L{cx+s*.87} {cy+s*.5}Z'
    return (f'<g><path d="{left}" fill="{C}" fill-opacity="{fill_op*.55:.2f}" stroke="{W}" stroke-width="1.6" stroke-linejoin="round"/>'
            f'<path d="{right}" fill="{C}" fill-opacity="{fill_op*.8:.2f}" stroke="{W}" stroke-width="1.6" stroke-linejoin="round"/>'
            f'<path d="{top}" fill="{W}" fill-opacity="{fill_op*.85:.2f}" stroke="{W}" stroke-width="1.6" stroke-linejoin="round"/></g>')


def orbit(cx, cy, rx, ry, dur, col=A, r=3.5, begin=0):
    p = f'M{cx-rx} {cy} A{rx} {ry} 0 1 1 {cx+rx} {cy} A{rx} {ry} 0 1 1 {cx-rx} {cy}'
    return (f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="none" stroke="{W}" stroke-opacity=".3" stroke-dasharray="3 5"/>'
            f'<circle r="{r}" fill="{col}"><animateMotion dur="{dur}s" begin="{begin}s" repeatCount="indefinite" path="{p}"/></circle>')


def imm():
    """XR: a 3D scene is rendered in the network and streamed to a person wearing a headset; the person's head
    movement and hand input flow back, and the same scene appears as AR on a phone."""
    r_down = 'M132 128 C 196 96, 286 96, 358 136'
    r_up = 'M358 178 C 286 216, 196 216, 132 176'
    scene = (f'<rect x="14" y="62" width="120" height="126" rx="14" fill="{D}" stroke="{W}" stroke-opacity=".7" stroke-width="2"/>'
             f'<path d="M26 150 L74 126 L122 150 L74 176Z" fill="{C}" fill-opacity=".28" stroke="{W}" stroke-opacity=".5"/>'
             f'<path d="M50 138 L74 126 L98 138 L74 150Z M50 138 L50 148 L74 160 L74 150Z M98 138 L98 148 L74 160 L74 150Z" fill="{C}" fill-opacity=".85" stroke="{W}" stroke-width="1.4" stroke-linejoin="round" transform="translate(-22 -10) scale(.7) translate(32 18)"/>'
             f'<circle cx="98" cy="128" r="12" fill="{W}" fill-opacity=".9"><animate attributeName="cy" values="128;118;128" dur="2.4s" repeatCount="indefinite"/></circle>'
             f'<circle cx="94" cy="124" r="3.5" fill="{C}"><animate attributeName="cy" values="124;114;124" dur="2.4s" repeatCount="indefinite"/></circle>'
             f'<path d="M30 150 l8 -14 l8 14 M52 160 l6 -10 l6 10" stroke="{G}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>')
    head = (f'<g><animateTransform attributeName="transform" type="rotate" values="-10 396 150;10 396 150;-10 396 150" dur="4.4s" repeatCount="indefinite"/>'
            f'<circle cx="396" cy="150" r="24" fill="{W}" fill-opacity=".9"/>'
            f'<rect x="368" y="140" width="56" height="22" rx="9" fill="{D}" stroke="{W}" stroke-width="2"/>'
            f'<circle cx="384" cy="151" r="6" fill="{C}"/><circle cx="408" cy="151" r="6" fill="{C}"/>'
            f'<path d="M368 150 C 356 150, 356 130, 372 124 M424 150 C 436 150, 436 130, 420 124" stroke="{W}" stroke-opacity=".7" stroke-width="2.4" fill="none"/></g>')
    body_ = (f'<path d="M354 242 C 354 188, 438 188, 438 242Z" fill="{W}" fill-opacity=".9"/>'
             f'<rect x="338" y="206" width="14" height="26" rx="6" fill="{D}" stroke="{W}" stroke-width="1.8"><animate attributeName="y" values="206;196;206" dur="2.2s" repeatCount="indefinite"/></rect>'
             f'<rect x="440" y="206" width="14" height="26" rx="6" fill="{D}" stroke="{W}" stroke-width="1.8"><animate attributeName="y" values="196;206;196" dur="2.2s" repeatCount="indefinite"/></rect>')
    phone_ar = (phone(432, 30, .55, play=False)
                + f'<rect x="437" y="42" width="24" height="26" rx="3" fill="{C}" fill-opacity=".5"/>'
                + f'<g><animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" dur="2.4s" repeatCount="indefinite"/>'
                  f'<path d="M449 46 L458 51 L449 56 L440 51Z M440 51 L440 60 L449 65 L449 56Z M458 51 L458 60 L449 65 L449 56Z" fill="{W}" fill-opacity=".92" stroke="{D}" stroke-width=".8" stroke-linejoin="round"/></g>')
    body = (zone(168, 72, 150, 168, 'network', 243, 92)
            + route(r_down) + route(r_up, A, '3 6') + packets(r_down, 4, 2.4) + packets(r_up, 4, 2.4, A, 3.2)
            + f'<rect x="188" y="142" width="110" height="18" rx="9" fill="{W}"/>' + t(243, 155, 'scene, video, audio', 9.5, col=D, op='1', bold=True)
            + f'<rect x="196" y="168" width="94" height="18" rx="9" fill="{A}"/>' + t(243, 181, 'head and hand input', 9.5, col=D, op='1', bold=True)
            + scene + t(74, 206, '3D scene', 11)
            + body_ + head + phone_ar
            + orbit(396, 150, 62, 24, 6, A, 3.2)
            + t(396, 258, 'XR: look around, move, interact', 10.5, op='1', bold=True)
            + t(459, 100, 'AR', 10.5) + t(290, 272, 'VR · AR · MR', 10, op='.8'))
    return sd.svg(body, '0 0 480 310')


# ---------------------------------------------------------------- Connected Media Production
def prod():
    """Live contribution over 5G, with the media application asking the network, through network APIs, for what
    the production needs: a guaranteed quality of service for the uplink and a dedicated network around the cameras.
    The scene stays abstract (no API names). One 8 second cycle: request, configure, both switch on."""
    dur = 8

    def cam(x, y, col_begin):
        return (f'<rect x="{x}" y="{y}" width="46" height="30" rx="5" fill="{D}" stroke="{W}" stroke-opacity=".75" stroke-width="2"/>'
                f'<path d="M{x+46} {y+8} L{x+62} {y+1} L{x+62} {y+29} L{x+46} {y+22}Z" fill="{D}" stroke="{W}" stroke-opacity=".75" stroke-width="2" stroke-linejoin="round"/>'
                f'<circle cx="{x+9}" cy="{y+9}" r="3.4" fill="{RED}">{blink(1.2, .2, col_begin)}</circle>'
                f'<circle cx="{x+27}" cy="{y+17}" r="8" fill="{C}" fill-opacity=".85"/>')

    def shot(path, begin, frac=.15):
        return (f'<circle r="4.5" fill="{A}" opacity="0"><animateMotion dur="{dur}s" begin="{begin}s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;{frac};1" calcMode="linear" path="{path}"/>'
                f'<animate attributeName="opacity" values="1;1;0;0" keyTimes="0;{frac};{frac+.01};1" dur="{dur}s" begin="{begin}s" repeatCount="indefinite"/></circle>')

    on = lambda extra='': (f'<animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;.3;.375;.9;1" dur="{dur}s" repeatCount="indefinite"/>')
    ys = [52, 128, 204]
    r_up = [f'M84 {y + 16} C 120 {y + 16}, 128 150, 168 150' for y in ys]
    r_hub = 'M196 150 L 248 150'
    r_out = 'M372 150 L 396 150'
    r_req = 'M308 76 L 296 54'
    r_cfg = 'M240 36 C 214 42, 190 62, 178 88'
    tiles = ''
    for k in range(4):
        x, y = 262 + (k % 2) * 48, 112 + (k // 2) * 34
        tiles += (f'<rect x="{x}" y="{y}" width="42" height="28" rx="4" fill="{C}" fill-opacity=".35" stroke="{W}" stroke-opacity=".5"/>'
                  f'<rect x="{x}" y="{y}" width="42" height="28" rx="4" fill="{A}" fill-opacity="0" stroke="{A}" stroke-width="2.4" stroke-opacity="0">'
                  f'<animate attributeName="fill-opacity" values="0;.55;.55;0;0" keyTimes="0;.05;.22;.27;1" dur="6s" begin="{k*1.5}s" repeatCount="indefinite"/>'
                  f'<animate attributeName="stroke-opacity" values="0;1;1;0;0" keyTimes="0;.05;.22;.27;1" dur="6s" begin="{k*1.5}s" repeatCount="indefinite"/></rect>')
    dedicated = (f'<g opacity="0">{on()}<rect x="6" y="52" width="206" height="232" rx="18" fill="{G}" fill-opacity=".14" stroke="{G}" stroke-width="2.4" stroke-dasharray="7 6"/>'
                 f'<rect x="40" y="272" width="138" height="18" rx="9" fill="{G}"/>' + t(109, 285, 'dedicated network', 10, col=W, op='1', bold=True) + '</g>')
    qod = (f'<g opacity="0">{on()}' + ''.join(f'<path d="{r}" stroke="{G}" stroke-width="4.5" fill="none" stroke-linecap="round"/>' for r in r_up)
           + f'<rect x="108" y="92" width="64" height="16" rx="8" fill="{G}"/>' + t(140, 104, 'QoS uplink', 9, col=W, op='1', bold=True) + '</g>')
    body = (dedicated
            + ''.join(route(r) for r in r_up) + route(r_hub) + route(r_out) + qod
            + ''.join(packets(r, 3, 2.2) for r in r_up) + packets(r_hub, 3, 1.6) + packets(r_out, 2, 1.4)
            + ''.join(cam(18, y, -i * .4) for i, y in enumerate(ys))
            + t(50, 100, 'cameras', 10.5) + t(50, 252, 'on location', 10.5)
            + tower(172, 92, .6)
            + f'<rect x="68" y="24" width="104" height="20" rx="10" fill="{A}"/>' + t(120, 38, '5G uplink', 10, col=D, op='1', bold=True)
            + f'<rect x="236" y="14" width="124" height="42" rx="10" fill="{D}" stroke="{W}" stroke-opacity=".75" stroke-width="2"/>'
            + t(298, 30, 'network APIs', 10.5, op='1', bold=True) + t(298, 45, 'QoS on request', 9)
            + route(r_req, A, '3 4') + route(r_cfg, A, '3 4') + shot(r_req, 0) + shot(r_cfg, 1.2, .2)
            + t(344, 70, 'request', 9) + t(212, 62, 'configure', 9)
            + f'<rect x="250" y="92" width="116" height="116" rx="12" fill="{D}" stroke="{W}" stroke-opacity=".7" stroke-width="2"/>' + tiles
            + f'<rect x="276" y="76" width="64" height="18" rx="9" fill="{RED}"/>' + t(314, 89, 'ON AIR', 10, col=W, op='1', bold=True)
            + f'<circle cx="286" cy="85" r="3" fill="{W}">{blink(1, .2)}</circle>'
            + t(308, 228, 'production', 11, op='1', bold=True)
            + tv(398, 124) + t(431, 196, 'to distribution', 10))
    return sd.svg(body, '0 0 480 310')


SCENES = {'rtc': rtc, 'bcast': bcast, 'ntn': ntn, 'imm': imm, 'prod': prod}


def build():
    out = {}
    for k, f in SCENES.items():
        m = f()
        for i in ('bg', 'ar'):
            m = m.replace(f'id="{i}"', f'id="{i}-{k}"').replace(f'url(#{i})', f'url(#{i}-{k})')
        m = m.replace('id="cp"', f'id="cp-{k}"').replace('url(#cp)', f'url(#cp-{k})')
        out[k] = m
    return out


if __name__ == '__main__':
    out = pathlib.Path(__file__).resolve().parent.parent / 'src/components/ShowcaseDiagram/areaHeroes.js'
    body = ',\n'.join(f'  {k}: {json.dumps(v)}' for k, v in build().items())
    out.write_text('// Generated by scripts/area-heroes.py. Do not edit by hand.\n'
                   f'export const AREA_HEROES = {{\n{body},\n}};\n')
    print(out)
