/* eslint-disable */
module.exports = {
  name: "@yarnpkg/plugin-workspace-tools",
  factory: function (require) {
    var plugin;
    plugin = (() => {
      "use strict";
      var e = {
          997: (e, t, n) => {
            n.r(t), n.d(t, { default: () => R });
            function o(e, t, n, o) {
              var r,
                a = arguments.length,
                s =
                  a < 3
                    ? t
                    : null === o
                    ? (o = Object.getOwnPropertyDescriptor(t, n))
                    : o;
              if (
                "object" == typeof Reflect &&
                "function" == typeof Reflect.decorate
              )
                s = Reflect.decorate(e, t, n, o);
              else
                for (var i = e.length - 1; i >= 0; i--)
                  (r = e[i]) &&
                    (s = (a < 3 ? r(s) : a > 3 ? r(t, n, s) : r(t, n)) || s);
              return a > 3 && s && Object.defineProperty(t, n, s), s;
            }
            const r = require("@yarnpkg/cli"),
              a = require("@yarnpkg/core"),
              s = require("clipanion"),
              i = require("yup");
            class l extends r.BaseCommand {
              constructor() {
                super(...arguments),
                  (this.workspaces = []),
                  (this.json = !1),
                  (this.production = !1),
                  (this.all = !1);
              }
              async execute() {
                const e = await a.Configuration.find(
                    this.context.cwd,
                    this.context.plugins
                  ),
                  { project: t, workspace: n } = await a.Project.find(
                    e,
                    this.context.cwd
                  ),
                  o = await a.Cache.find(e);
                let s;
                if (this.all) s = new Set(t.workspaces);
                else if (0 === this.workspaces.length) {
                  if (!n)
                    throw new r.WorkspaceRequiredError(t.cwd, this.context.cwd);
                  s = new Set([n]);
                } else
                  s = new Set(
                    this.workspaces.map((e) =>
                      t.getWorkspaceByIdent(a.structUtils.parseIdent(e))
                    )
                  );
                for (const e of s)
                  for (const n of a.Manifest.hardDependencies)
                    for (const o of e.manifest.getForScope(n).values()) {
                      const e = t.tryWorkspaceByDescriptor(o);
                      null !== e && s.add(e);
                    }
                for (const e of t.workspaces)
                  s.has(e)
                    ? this.production && e.manifest.devDependencies.clear()
                    : (e.manifest.dependencies.clear(),
                      e.manifest.devDependencies.clear(),
                      e.manifest.peerDependencies.clear(),
                      e.manifest.scripts.clear());
                return (
                  await a.StreamReport.start(
                    {
                      configuration: e,
                      json: this.json,
                      stdout: this.context.stdout,
                      includeLogs: !0,
                    },
                    async (e) => {
                      await t.install({
                        cache: o,
                        report: e,
                        persistProject: !1,
                      });
                    }
                  )
                ).exitCode();
              }
            }
            (l.usage = s.Command.Usage({
              category: "Workspace-related commands",
              description: "install a single workspace and its dependencies",
              details:
                "\n      This command will run an install as if the specified workspaces (and all other workspaces they depend on) were the only ones in the project. If no workspaces are explicitly listed, the active one will be assumed.\n\n      Note that this command is only very moderately useful when using zero-installs, since the cache will contain all the packages anyway - meaning that the only difference between a full install and a focused install would just be a few extra lines in the `.pnp.js` file, at the cost of introducing an extra complexity.\n\n      If the `-A,--all` flag is set, the entire project will be installed. Combine with `--production` to replicate the old `yarn install --production`.\n    ",
            })),
              (l.schema = i
                .object()
                .shape({
                  all: i.bool(),
                  workspaces: i
                    .array()
                    .when("all", {
                      is: !0,
                      then: i
                        .array()
                        .max(
                          0,
                          "Cannot specify workspaces when using the --all flag"
                        ),
                      otherwise: i.array(),
                    }),
                })),
              o([s.Command.Rest()], l.prototype, "workspaces", void 0),
              o(
                [
                  s.Command.Boolean("--json", {
                    description: "Format the output as an NDJSON stream",
                  }),
                ],
                l.prototype,
                "json",
                void 0
              ),
              o(
                [
                  s.Command.Boolean("--production", {
                    description:
                      "Only install regular dependencies by omitting dev dependencies",
                  }),
                ],
                l.prototype,
                "production",
                void 0
              ),
              o(
                [
                  s.Command.Boolean("-A,--all", {
                    description: "Install the entire project",
                  }),
                ],
                l.prototype,
                "all",
                void 0
              ),
              o(
                [s.Command.Path("workspaces", "focus")],
                l.prototype,
                "execute",
                null
              );
            var u = n(401),
              p = n.n(u);
            const c = require("os");
            var d = n(578),
              f = n.n(d);
            const h = (e, t) => {
                const n = [];
                for (const o of e.workspacesCwds) {
                  const e = t.workspacesByCwd.get(o);
                  e && n.push(e, ...h(e, t));
                }
                return n;
              },
              g = (e, t) => {
                const n = new Set(),
                  o = (e) => {
                    const r = new Map([
                      ...e.manifest.dependencies,
                      ...e.manifest.devDependencies,
                    ]);
                    for (const e of r.values()) {
                      const r = t.tryWorkspaceByDescriptor(e);
                      null === r || n.has(r) || (n.add(r), o(r));
                    }
                  };
                return o(e), n;
              };
            class A extends r.BaseCommand {
              constructor() {
                super(...arguments),
                  (this.args = []),
                  (this.allLegacy = !1),
                  (this.recursive = !1),
                  (this.verbose = !1),
                  (this.parallel = !1),
                  (this.interlaced = !1),
                  (this.topological = !1),
                  (this.topologicalDev = !1),
                  (this.include = []),
                  (this.exclude = []),
                  (this.publicOnly = !1);
              }
              async execute() {
                var e;
                const t = await a.Configuration.find(
                    this.context.cwd,
                    this.context.plugins
                  ),
                  { project: n, workspace: o } = await a.Project.find(
                    t,
                    this.context.cwd
                  ),
                  i =
                    null !== (e = this.all) && void 0 !== e
                      ? e
                      : this.allLegacy;
                if (!i && !o)
                  throw new r.WorkspaceRequiredError(n.cwd, this.context.cwd);
                const l = this.cli.process([this.commandName, ...this.args]),
                  u =
                    1 === l.path.length &&
                    "run" === l.path[0] &&
                    void 0 !== l.scriptName
                      ? l.scriptName
                      : null;
                if (0 === l.path.length)
                  throw new s.UsageError(
                    "Invalid subcommand name for iteration - use the 'run' keyword if you wish to execute a script"
                  );
                const d = i ? n.topLevelWorkspace : o,
                  A = this.recursive ? [d, ...g(d, n)] : [d, ...h(d, n)],
                  R = [];
                for (const e of A)
                  (!u || e.manifest.scripts.has(u) || u.includes(":")) &&
                    ((u === process.env.npm_lifecycle_event &&
                      e.cwd === o.cwd) ||
                      (this.include.length > 0 &&
                        !p().isMatch(
                          a.structUtils.stringifyIdent(e.locator),
                          this.include
                        )) ||
                      (this.exclude.length > 0 &&
                        p().isMatch(
                          a.structUtils.stringifyIdent(e.locator),
                          this.exclude
                        )) ||
                      (this.publicOnly && !0 === e.manifest.private) ||
                      R.push(e));
                let m = this.interlaced;
                this.parallel || (m = !0);
                const _ = new Map(),
                  E = new Set(),
                  C = this.parallel ? Math.max(1, (0, c.cpus)().length / 2) : 1,
                  b = f()(this.jobs || C);
                let v = 0,
                  x = null,
                  w = !1;
                const S = await a.StreamReport.start(
                  { configuration: t, stdout: this.context.stdout },
                  async (e) => {
                    const o = async (n, { commandIndex: o }) => {
                      if (w) return -1;
                      !this.parallel &&
                        this.verbose &&
                        o > 1 &&
                        e.reportSeparator();
                      const r = (function (
                          e,
                          { configuration: t, commandIndex: n, verbose: o }
                        ) {
                          if (!o) return null;
                          const r = a.structUtils.convertToIdent(e.locator),
                            s = `[${a.structUtils.stringifyIdent(r)}]:`,
                            i = [
                              "#2E86AB",
                              "#A23B72",
                              "#F18F01",
                              "#C73E1D",
                              "#CCE2A3",
                            ],
                            l = i[n % i.length];
                          return a.formatUtils.pretty(t, s, l);
                        })(n, {
                          configuration: t,
                          verbose: this.verbose,
                          commandIndex: o,
                        }),
                        [s, i] = y(e, { prefix: r, interlaced: m }),
                        [l, u] = y(e, { prefix: r, interlaced: m });
                      try {
                        const t =
                          (await this.cli.run(
                            [this.commandName, ...this.args],
                            { cwd: n.cwd, stdout: s, stderr: l }
                          )) || 0;
                        s.end(), l.end();
                        const o = await i,
                          a = await u;
                        return (
                          this.verbose &&
                            o &&
                            a &&
                            e.reportInfo(
                              null,
                              `${r} Process exited without output (exit code ${t})`
                            ),
                          130 === t && ((w = !0), (x = t)),
                          t
                        );
                      } catch (e) {
                        throw (s.end(), l.end(), await i, await u, e);
                      }
                    };
                    for (const e of R) _.set(e.anchoredLocator.locatorHash, e);
                    for (; _.size > 0 && !e.hasErrors(); ) {
                      const r = [];
                      for (const [e, t] of _) {
                        if (E.has(t.anchoredDescriptor.descriptorHash))
                          continue;
                        let a = !0;
                        if (this.topological || this.topologicalDev) {
                          const e = this.topologicalDev
                            ? new Map([
                                ...t.manifest.dependencies,
                                ...t.manifest.devDependencies,
                              ])
                            : t.manifest.dependencies;
                          for (const t of e.values()) {
                            const e = n.tryWorkspaceByDescriptor(t);
                            if (
                              ((a =
                                null === e ||
                                !_.has(e.anchoredLocator.locatorHash)),
                              !a)
                            )
                              break;
                          }
                        }
                        if (
                          a &&
                          (E.add(t.anchoredDescriptor.descriptorHash),
                          r.push(
                            b(async () => {
                              const n = await o(t, { commandIndex: ++v });
                              return (
                                _.delete(e),
                                E.delete(t.anchoredDescriptor.descriptorHash),
                                n
                              );
                            })
                          ),
                          !this.parallel)
                        )
                          break;
                      }
                      if (0 === r.length) {
                        const n = Array.from(_.values())
                          .map((e) =>
                            a.structUtils.prettyLocator(t, e.anchoredLocator)
                          )
                          .join(", ");
                        return void e.reportError(
                          a.MessageName.CYCLIC_DEPENDENCIES,
                          `Dependency cycle detected (${n})`
                        );
                      }
                      const s = (await Promise.all(r)).find((e) => 0 !== e);
                      null === x && (x = void 0 !== s ? 1 : x),
                        (this.topological || this.topologicalDev) &&
                          void 0 !== s &&
                          e.reportError(
                            a.MessageName.UNNAMED,
                            "The command failed for workspaces that are depended upon by other workspaces; can't satisfy the dependency graph"
                          );
                    }
                  }
                );
                return null !== x ? x : S.exitCode();
              }
            }
            function y(e, { prefix: t, interlaced: n }) {
              const o = e.createStreamReporter(t),
                r = new a.miscUtils.DefaultStream();
              r.pipe(o, { end: !1 }),
                r.on("finish", () => {
                  o.end();
                });
              const s = new Promise((e) => {
                o.on("finish", () => {
                  e(r.active);
                });
              });
              if (n) return [r, s];
              const i = new a.miscUtils.BufferStream();
              return (
                i.pipe(r, { end: !1 }),
                i.on("finish", () => {
                  r.end();
                }),
                [i, s]
              );
            }
            (A.schema = i
              .object()
              .shape({
                jobs: i.number().min(2),
                parallel: i
                  .boolean()
                  .when("jobs", {
                    is: (e) => e > 1,
                    then: i
                      .boolean()
                      .oneOf([!0], "--parallel must be set when using --jobs"),
                    otherwise: i.boolean(),
                  }),
              })),
              (A.usage = s.Command.Usage({
                category: "Workspace-related commands",
                description: "run a command on all workspaces",
                details:
                  "\n      This command will run a given sub-command on current and all its descendant workspaces. Various flags can alter the exact behavior of the command:\n\n      - If `-p,--parallel` is set, the commands will be ran in parallel; they'll by default be limited to a number of parallel tasks roughly equal to half your core number, but that can be overridden via `-j,--jobs`.\n\n      - If `-p,--parallel` and `-i,--interlaced` are both set, Yarn will print the lines from the output as it receives them. If `-i,--interlaced` wasn't set, it would instead buffer the output from each process and print the resulting buffers only after their source processes have exited.\n\n      - If `-t,--topological` is set, Yarn will only run the command after all workspaces that it depends on through the `dependencies` field have successfully finished executing. If `--topological-dev` is set, both the `dependencies` and `devDependencies` fields will be considered when figuring out the wait points.\n\n      - If `-A,--all` is set, Yarn will run the command on all the workspaces of a project. By default yarn runs the command only on current and all its descendant workspaces.\n\n      - If `-R,--recursive` is set, Yarn will find workspaces to run the command on by recursively evaluating `dependencies` and `devDependencies` fields, instead of looking at the `workspaces` fields.\n\n      - The command may apply to only some workspaces through the use of `--include` which acts as a whitelist. The `--exclude` flag will do the opposite and will be a list of packages that mustn't execute the script. Both flags accept glob patterns (if valid Idents and supported by [micromatch](https://github.com/micromatch/micromatch)). Make sure to escape the patterns, to prevent your own shell from trying to expand them.\n\n      Adding the `-v,--verbose` flag will cause Yarn to print more information; in particular the name of the workspace that generated the output will be printed at the front of each line.\n\n      If the command is `run` and the script being run does not exist the child workspace will be skipped without error.\n    ",
                examples: [
                  [
                    "Publish current and all descendant packages",
                    "yarn workspaces foreach npm publish --tolerate-republish",
                  ],
                  [
                    "Run build script on current and all descendant packages",
                    "yarn workspaces foreach run build",
                  ],
                  [
                    "Run build script on current and all descendant packages in parallel, building dependent packages first",
                    "yarn workspaces foreach -pt run build",
                  ],
                ],
              })),
              o([s.Command.String()], A.prototype, "commandName", void 0),
              o([s.Command.Proxy()], A.prototype, "args", void 0),
              o(
                [s.Command.Boolean("-a", { hidden: !0 })],
                A.prototype,
                "allLegacy",
                void 0
              ),
              o(
                [
                  s.Command.Boolean("-R,--recursive", {
                    description:
                      "Find packages via dependencies/devDependencies instead of using the workspaces field",
                  }),
                ],
                A.prototype,
                "recursive",
                void 0
              ),
              o(
                [
                  s.Command.Boolean("-A,--all", {
                    description:
                      "Run the command on all workspaces of a project",
                  }),
                ],
                A.prototype,
                "all",
                void 0
              ),
              o(
                [
                  s.Command.Boolean("-v,--verbose", {
                    description:
                      "Prefix each output line with the name of the originating workspace",
                  }),
                ],
                A.prototype,
                "verbose",
                void 0
              ),
              o(
                [
                  s.Command.Boolean("-p,--parallel", {
                    description: "Run the commands in parallel",
                  }),
                ],
                A.prototype,
                "parallel",
                void 0
              ),
              o(
                [
                  s.Command.Boolean("-i,--interlaced", {
                    description:
                      "Print the output of commands in real-time instead of buffering it",
                  }),
                ],
                A.prototype,
                "interlaced",
                void 0
              ),
              o(
                [
                  s.Command.String("-j,--jobs", {
                    description:
                      "The maximum number of parallel tasks that the execution will be limited to",
                  }),
                ],
                A.prototype,
                "jobs",
                void 0
              ),
              o(
                [
                  s.Command.Boolean("-t,--topological", {
                    description:
                      "Run the command after all workspaces it depends on (regular) have finished",
                  }),
                ],
                A.prototype,
                "topological",
                void 0
              ),
              o(
                [
                  s.Command.Boolean("--topological-dev", {
                    description:
                      "Run the command after all workspaces it depends on (regular + dev) have finished",
                  }),
                ],
                A.prototype,
                "topologicalDev",
                void 0
              ),
              o(
                [
                  s.Command.Array("--include", {
                    description:
                      "An array of glob pattern idents; only matching workspaces will be traversed",
                  }),
                ],
                A.prototype,
                "include",
                void 0
              ),
              o(
                [
                  s.Command.Array("--exclude", {
                    description:
                      "An array of glob pattern idents; matching workspaces won't be traversed",
                  }),
                ],
                A.prototype,
                "exclude",
                void 0
              ),
              o(
                [
                  s.Command.Boolean("--no-private", {
                    description:
                      "Avoid running the command on private workspaces",
                  }),
                ],
                A.prototype,
                "publicOnly",
                void 0
              ),
              o(
                [s.Command.Path("workspaces", "foreach")],
                A.prototype,
                "execute",
                null
              );
            const R = { commands: [l, A] };
          },
          235: (e, t, n) => {
            const o = n(900),
              r = n(617),
              a = n(495),
              s = n(425),
              i = (e, t = {}) => {
                let n = [];
                if (Array.isArray(e))
                  for (let o of e) {
                    let e = i.create(o, t);
                    Array.isArray(e) ? n.push(...e) : n.push(e);
                  }
                else n = [].concat(i.create(e, t));
                return (
                  t &&
                    !0 === t.expand &&
                    !0 === t.nodupes &&
                    (n = [...new Set(n)]),
                  n
                );
              };
            (i.parse = (e, t = {}) => s(e, t)),
              (i.stringify = (e, t = {}) =>
                o("string" == typeof e ? i.parse(e, t) : e, t)),
              (i.compile = (e, t = {}) => (
                "string" == typeof e && (e = i.parse(e, t)), r(e, t)
              )),
              (i.expand = (e, t = {}) => {
                "string" == typeof e && (e = i.parse(e, t));
                let n = a(e, t);
                return (
                  !0 === t.noempty && (n = n.filter(Boolean)),
                  !0 === t.nodupes && (n = [...new Set(n)]),
                  n
                );
              }),
              (i.create = (e, t = {}) =>
                "" === e || e.length < 3
                  ? [e]
                  : !0 !== t.expand
                  ? i.compile(e, t)
                  : i.expand(e, t)),
              (e.exports = i);
          },
          617: (e, t, n) => {
            const o = n(169),
              r = n(542);
            e.exports = (e, t = {}) => {
              let n = (e, a = {}) => {
                let s = r.isInvalidBrace(a),
                  i = !0 === e.invalid && !0 === t.escapeInvalid,
                  l = !0 === s || !0 === i,
                  u = !0 === t.escapeInvalid ? "\\" : "",
                  p = "";
                if (!0 === e.isOpen) return u + e.value;
                if (!0 === e.isClose) return u + e.value;
                if ("open" === e.type) return l ? u + e.value : "(";
                if ("close" === e.type) return l ? u + e.value : ")";
                if ("comma" === e.type)
                  return "comma" === e.prev.type ? "" : l ? e.value : "|";
                if (e.value) return e.value;
                if (e.nodes && e.ranges > 0) {
                  let n = r.reduce(e.nodes),
                    a = o(...n, { ...t, wrap: !1, toRegex: !0 });
                  if (0 !== a.length)
                    return n.length > 1 && a.length > 1 ? `(${a})` : a;
                }
                if (e.nodes) for (let t of e.nodes) p += n(t, e);
                return p;
              };
              return n(e);
            };
          },
          384: (e) => {
            e.exports = {
              MAX_LENGTH: 65536,
              CHAR_0: "0",
              CHAR_9: "9",
              CHAR_UPPERCASE_A: "A",
              CHAR_LOWERCASE_A: "a",
              CHAR_UPPERCASE_Z: "Z",
              CHAR_LOWERCASE_Z: "z",
              CHAR_LEFT_PARENTHESES: "(",
              CHAR_RIGHT_PARENTHESES: ")",
              CHAR_ASTERISK: "*",
              CHAR_AMPERSAND: "&",
              CHAR_AT: "@",
              CHAR_BACKSLASH: "\\",
              CHAR_BACKTICK: "`",
              CHAR_CARRIAGE_RETURN: "\r",
              CHAR_CIRCUMFLEX_ACCENT: "^",
              CHAR_COLON: ":",
              CHAR_COMMA: ",",
              CHAR_DOLLAR: "$",
              CHAR_DOT: ".",
              CHAR_DOUBLE_QUOTE: '"',
              CHAR_EQUAL: "=",
              CHAR_EXCLAMATION_MARK: "!",
              CHAR_FORM_FEED: "\f",
              CHAR_FORWARD_SLASH: "/",
              CHAR_HASH: "#",
              CHAR_HYPHEN_MINUS: "-",
              CHAR_LEFT_ANGLE_BRACKET: "<",
              CHAR_LEFT_CURLY_BRACE: "{",
              CHAR_LEFT_SQUARE_BRACKET: "[",
              CHAR_LINE_FEED: "\n",
              CHAR_NO_BREAK_SPACE: " ",
              CHAR_PERCENT: "%",
              CHAR_PLUS: "+",
              CHAR_QUESTION_MARK: "?",
              CHAR_RIGHT_ANGLE_BRACKET: ">",
              CHAR_RIGHT_CURLY_BRACE: "}",
              CHAR_RIGHT_SQUARE_BRACKET: "]",
              CHAR_SEMICOLON: ";",
              CHAR_SINGLE_QUOTE: "'",
              CHAR_SPACE: " ",
              CHAR_TAB: "\t",
              CHAR_UNDERSCORE: "_",
              CHAR_VERTICAL_LINE: "|",
              CHAR_ZERO_WIDTH_NOBREAK_SPACE: "\ufeff",
            };
          },
          495: (e, t, n) => {
            const o = n(169),
              r = n(900),
              a = n(542),
              s = (e = "", t = "", n = !1) => {
                let o = [];
                if (((e = [].concat(e)), !(t = [].concat(t)).length)) return e;
                if (!e.length) return n ? a.flatten(t).map((e) => `{${e}}`) : t;
                for (let r of e)
                  if (Array.isArray(r)) for (let e of r) o.push(s(e, t, n));
                  else
                    for (let e of t)
                      !0 === n && "string" == typeof e && (e = `{${e}}`),
                        o.push(Array.isArray(e) ? s(r, e, n) : r + e);
                return a.flatten(o);
              };
            e.exports = (e, t = {}) => {
              let n = void 0 === t.rangeLimit ? 1e3 : t.rangeLimit,
                i = (e, l = {}) => {
                  e.queue = [];
                  let u = l,
                    p = l.queue;
                  for (; "brace" !== u.type && "root" !== u.type && u.parent; )
                    (u = u.parent), (p = u.queue);
                  if (e.invalid || e.dollar)
                    return void p.push(s(p.pop(), r(e, t)));
                  if (
                    "brace" === e.type &&
                    !0 !== e.invalid &&
                    2 === e.nodes.length
                  )
                    return void p.push(s(p.pop(), ["{}"]));
                  if (e.nodes && e.ranges > 0) {
                    let i = a.reduce(e.nodes);
                    if (a.exceedsLimit(...i, t.step, n))
                      throw new RangeError(
                        "expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit."
                      );
                    let l = o(...i, t);
                    return (
                      0 === l.length && (l = r(e, t)),
                      p.push(s(p.pop(), l)),
                      void (e.nodes = [])
                    );
                  }
                  let c = a.encloseBrace(e),
                    d = e.queue,
                    f = e;
                  for (; "brace" !== f.type && "root" !== f.type && f.parent; )
                    (f = f.parent), (d = f.queue);
                  for (let t = 0; t < e.nodes.length; t++) {
                    let n = e.nodes[t];
                    "comma" !== n.type || "brace" !== e.type
                      ? "close" !== n.type
                        ? n.value && "open" !== n.type
                          ? d.push(s(d.pop(), n.value))
                          : n.nodes && i(n, e)
                        : p.push(s(p.pop(), d, c))
                      : (1 === t && d.push(""), d.push(""));
                  }
                  return d;
                };
              return a.flatten(i(e));
            };
          },
          425: (e, t, n) => {
            const o = n(900),
              {
                MAX_LENGTH: r,
                CHAR_BACKSLASH: a,
                CHAR_BACKTICK: s,
                CHAR_COMMA: i,
                CHAR_DOT: l,
                CHAR_LEFT_PARENTHESES: u,
                CHAR_RIGHT_PARENTHESES: p,
                CHAR_LEFT_CURLY_BRACE: c,
                CHAR_RIGHT_CURLY_BRACE: d,
                CHAR_LEFT_SQUARE_BRACKET: f,
                CHAR_RIGHT_SQUARE_BRACKET: h,
                CHAR_DOUBLE_QUOTE: g,
                CHAR_SINGLE_QUOTE: A,
                CHAR_NO_BREAK_SPACE: y,
                CHAR_ZERO_WIDTH_NOBREAK_SPACE: R,
              } = n(384);
            e.exports = (e, t = {}) => {
              if ("string" != typeof e)
                throw new TypeError("Expected a string");
              let n = t || {},
                m =
                  "number" == typeof n.maxLength ? Math.min(r, n.maxLength) : r;
              if (e.length > m)
                throw new SyntaxError(
                  `Input length (${e.length}), exceeds max characters (${m})`
                );
              let _,
                E = { type: "root", input: e, nodes: [] },
                C = [E],
                b = E,
                v = E,
                x = 0,
                w = e.length,
                S = 0,
                H = 0;
              const T = () => e[S++],
                k = (e) => {
                  if (
                    ("text" === e.type && "dot" === v.type && (v.type = "text"),
                    !v || "text" !== v.type || "text" !== e.type)
                  )
                    return (
                      b.nodes.push(e), (e.parent = b), (e.prev = v), (v = e), e
                    );
                  v.value += e.value;
                };
              for (k({ type: "bos" }); S < w; )
                if (((b = C[C.length - 1]), (_ = T()), _ !== R && _ !== y))
                  if (_ !== a)
                    if (_ !== h)
                      if (_ !== f)
                        if (_ !== u)
                          if (_ !== p)
                            if (_ !== g && _ !== A && _ !== s)
                              if (_ !== c)
                                if (_ !== d)
                                  if (_ === i && H > 0) {
                                    if (b.ranges > 0) {
                                      b.ranges = 0;
                                      let e = b.nodes.shift();
                                      b.nodes = [
                                        e,
                                        { type: "text", value: o(b) },
                                      ];
                                    }
                                    k({ type: "comma", value: _ }), b.commas++;
                                  } else if (
                                    _ === l &&
                                    H > 0 &&
                                    0 === b.commas
                                  ) {
                                    let e = b.nodes;
                                    if (0 === H || 0 === e.length) {
                                      k({ type: "text", value: _ });
                                      continue;
                                    }
                                    if ("dot" === v.type) {
                                      if (
                                        ((b.range = []),
                                        (v.value += _),
                                        (v.type = "range"),
                                        3 !== b.nodes.length &&
                                          5 !== b.nodes.length)
                                      ) {
                                        (b.invalid = !0),
                                          (b.ranges = 0),
                                          (v.type = "text");
                                        continue;
                                      }
                                      b.ranges++, (b.args = []);
                                      continue;
                                    }
                                    if ("range" === v.type) {
                                      e.pop();
                                      let t = e[e.length - 1];
                                      (t.value += v.value + _),
                                        (v = t),
                                        b.ranges--;
                                      continue;
                                    }
                                    k({ type: "dot", value: _ });
                                  } else k({ type: "text", value: _ });
                                else {
                                  if ("brace" !== b.type) {
                                    k({ type: "text", value: _ });
                                    continue;
                                  }
                                  let e = "close";
                                  (b = C.pop()),
                                    (b.close = !0),
                                    k({ type: e, value: _ }),
                                    H--,
                                    (b = C[C.length - 1]);
                                }
                              else {
                                H++;
                                let e =
                                  (v.value && "$" === v.value.slice(-1)) ||
                                  !0 === b.dollar;
                                (b = k({
                                  type: "brace",
                                  open: !0,
                                  close: !1,
                                  dollar: e,
                                  depth: H,
                                  commas: 0,
                                  ranges: 0,
                                  nodes: [],
                                })),
                                  C.push(b),
                                  k({ type: "open", value: _ });
                              }
                            else {
                              let e,
                                n = _;
                              for (
                                !0 !== t.keepQuotes && (_ = "");
                                S < w && (e = T());

                              )
                                if (e !== a) {
                                  if (e === n) {
                                    !0 === t.keepQuotes && (_ += e);
                                    break;
                                  }
                                  _ += e;
                                } else _ += e + T();
                              k({ type: "text", value: _ });
                            }
                          else {
                            if ("paren" !== b.type) {
                              k({ type: "text", value: _ });
                              continue;
                            }
                            (b = C.pop()),
                              k({ type: "text", value: _ }),
                              (b = C[C.length - 1]);
                          }
                        else
                          (b = k({ type: "paren", nodes: [] })),
                            C.push(b),
                            k({ type: "text", value: _ });
                      else {
                        x++;
                        let e;
                        for (; S < w && (e = T()); )
                          if (((_ += e), e !== f))
                            if (e !== a) {
                              if (e === h && (x--, 0 === x)) break;
                            } else _ += T();
                          else x++;
                        k({ type: "text", value: _ });
                      }
                    else k({ type: "text", value: "\\" + _ });
                  else
                    k({ type: "text", value: (t.keepEscaping ? _ : "") + T() });
              do {
                if (((b = C.pop()), "root" !== b.type)) {
                  b.nodes.forEach((e) => {
                    e.nodes ||
                      ("open" === e.type && (e.isOpen = !0),
                      "close" === e.type && (e.isClose = !0),
                      e.nodes || (e.type = "text"),
                      (e.invalid = !0));
                  });
                  let e = C[C.length - 1],
                    t = e.nodes.indexOf(b);
                  e.nodes.splice(t, 1, ...b.nodes);
                }
              } while (C.length > 0);
              return k({ type: "eos" }), E;
            };
          },
          900: (e, t, n) => {
            const o = n(542);
            e.exports = (e, t = {}) => {
              let n = (e, r = {}) => {
                let a = t.escapeInvalid && o.isInvalidBrace(r),
                  s = !0 === e.invalid && !0 === t.escapeInvalid,
                  i = "";
                if (e.value)
                  return (a || s) && o.isOpenOrClose(e)
                    ? "\\" + e.value
                    : e.value;
                if (e.value) return e.value;
                if (e.nodes) for (let t of e.nodes) i += n(t);
                return i;
              };
              return n(e);
            };
          },
          542: (e, t) => {
            (t.isInteger = (e) =>
              "number" == typeof e
                ? Number.isInteger(e)
                : "string" == typeof e &&
                  "" !== e.trim() &&
                  Number.isInteger(Number(e))),
              (t.find = (e, t) => e.nodes.find((e) => e.type === t)),
              (t.exceedsLimit = (e, n, o = 1, r) =>
                !1 !== r &&
                !(!t.isInteger(e) || !t.isInteger(n)) &&
                (Number(n) - Number(e)) / Number(o) >= r),
              (t.escapeNode = (e, t = 0, n) => {
                let o = e.nodes[t];
                o &&
                  ((n && o.type === n) ||
                    "open" === o.type ||
                    "close" === o.type) &&
                  !0 !== o.escaped &&
                  ((o.value = "\\" + o.value), (o.escaped = !0));
              }),
              (t.encloseBrace = (e) =>
                "brace" === e.type &&
                (e.commas >> (0 + e.ranges)) >> 0 == 0 &&
                ((e.invalid = !0), !0)),
              (t.isInvalidBrace = (e) =>
                "brace" === e.type &&
                (!(!0 !== e.invalid && !e.dollar) ||
                  (((e.commas >> (0 + e.ranges)) >> 0 == 0 ||
                    !0 !== e.open ||
                    !0 !== e.close) &&
                    ((e.invalid = !0), !0)))),
              (t.isOpenOrClose = (e) =>
                "open" === e.type ||
                "close" === e.type ||
                !0 === e.open ||
                !0 === e.close),
              (t.reduce = (e) =>
                e.reduce(
                  (e, t) => (
                    "text" === t.type && e.push(t.value),
                    "range" === t.type && (t.type = "text"),
                    e
                  ),
                  []
                )),
              (t.flatten = (...e) => {
                const t = [],
                  n = (e) => {
                    for (let o = 0; o < e.length; o++) {
                      let r = e[o];
                      Array.isArray(r) ? n(r, t) : void 0 !== r && t.push(r);
                    }
                    return t;
                  };
                return n(e), t;
              });
          },
          169: (e, t, n) => {
            /*!
             * fill-range <https://github.com/jonschlinkert/fill-range>
             *
             * Copyright (c) 2014-present, Jon Schlinkert.
             * Licensed under the MIT License.
             */
            const o = n(669),
              r = n(615),
              a = (e) =>
                null !== e && "object" == typeof e && !Array.isArray(e),
              s = (e) =>
                "number" == typeof e || ("string" == typeof e && "" !== e),
              i = (e) => Number.isInteger(+e),
              l = (e) => {
                let t = "" + e,
                  n = -1;
                if (("-" === t[0] && (t = t.slice(1)), "0" === t)) return !1;
                for (; "0" === t[++n]; );
                return n > 0;
              },
              u = (e, t, n) => {
                if (t > 0) {
                  let n = "-" === e[0] ? "-" : "";
                  n && (e = e.slice(1)),
                    (e = n + e.padStart(n ? t - 1 : t, "0"));
                }
                return !1 === n ? String(e) : e;
              },
              p = (e, t) => {
                let n = "-" === e[0] ? "-" : "";
                for (n && ((e = e.slice(1)), t--); e.length < t; ) e = "0" + e;
                return n ? "-" + e : e;
              },
              c = (e, t, n, o) => {
                if (n) return r(e, t, { wrap: !1, ...o });
                let a = String.fromCharCode(e);
                return e === t ? a : `[${a}-${String.fromCharCode(t)}]`;
              },
              d = (e, t, n) => {
                if (Array.isArray(e)) {
                  let t = !0 === n.wrap,
                    o = n.capture ? "" : "?:";
                  return t ? `(${o}${e.join("|")})` : e.join("|");
                }
                return r(e, t, n);
              },
              f = (...e) =>
                new RangeError("Invalid range arguments: " + o.inspect(...e)),
              h = (e, t, n) => {
                if (!0 === n.strictRanges) throw f([e, t]);
                return [];
              },
              g = (e, t, n = 1, o = {}) => {
                let r = Number(e),
                  a = Number(t);
                if (!Number.isInteger(r) || !Number.isInteger(a)) {
                  if (!0 === o.strictRanges) throw f([e, t]);
                  return [];
                }
                0 === r && (r = 0), 0 === a && (a = 0);
                let s = r > a,
                  i = String(e),
                  h = String(t),
                  g = String(n);
                n = Math.max(Math.abs(n), 1);
                let A = l(i) || l(h) || l(g),
                  y = A ? Math.max(i.length, h.length, g.length) : 0,
                  R =
                    !1 === A &&
                    !1 ===
                      ((e, t, n) =>
                        "string" == typeof e ||
                        "string" == typeof t ||
                        !0 === n.stringify)(e, t, o),
                  m =
                    o.transform ||
                    (
                      (e) => (t) =>
                        !0 === e ? Number(t) : String(t)
                    )(R);
                if (o.toRegex && 1 === n) return c(p(e, y), p(t, y), !0, o);
                let _ = { negatives: [], positives: [] },
                  E = [],
                  C = 0;
                for (; s ? r >= a : r <= a; )
                  !0 === o.toRegex && n > 1
                    ? _[(b = r) < 0 ? "negatives" : "positives"].push(
                        Math.abs(b)
                      )
                    : E.push(u(m(r, C), y, R)),
                    (r = s ? r - n : r + n),
                    C++;
                var b;
                return !0 === o.toRegex
                  ? n > 1
                    ? ((e, t) => {
                        e.negatives.sort((e, t) =>
                          e < t ? -1 : e > t ? 1 : 0
                        ),
                          e.positives.sort((e, t) =>
                            e < t ? -1 : e > t ? 1 : 0
                          );
                        let n,
                          o = t.capture ? "" : "?:",
                          r = "",
                          a = "";
                        return (
                          e.positives.length && (r = e.positives.join("|")),
                          e.negatives.length &&
                            (a = `-(${o}${e.negatives.join("|")})`),
                          (n = r && a ? `${r}|${a}` : r || a),
                          t.wrap ? `(${o}${n})` : n
                        );
                      })(_, o)
                    : d(E, null, { wrap: !1, ...o })
                  : E;
              },
              A = (e, t, n, o = {}) => {
                if (null == t && s(e)) return [e];
                if (!s(e) || !s(t)) return h(e, t, o);
                if ("function" == typeof n) return A(e, t, 1, { transform: n });
                if (a(n)) return A(e, t, 0, n);
                let r = { ...o };
                return (
                  !0 === r.capture && (r.wrap = !0),
                  (n = n || r.step || 1),
                  i(n)
                    ? i(e) && i(t)
                      ? g(e, t, n, r)
                      : ((e, t, n = 1, o = {}) => {
                          if (
                            (!i(e) && e.length > 1) ||
                            (!i(t) && t.length > 1)
                          )
                            return h(e, t, o);
                          let r =
                              o.transform || ((e) => String.fromCharCode(e)),
                            a = ("" + e).charCodeAt(0),
                            s = ("" + t).charCodeAt(0),
                            l = a > s,
                            u = Math.min(a, s),
                            p = Math.max(a, s);
                          if (o.toRegex && 1 === n) return c(u, p, !1, o);
                          let f = [],
                            g = 0;
                          for (; l ? a >= s : a <= s; )
                            f.push(r(a, g)), (a = l ? a - n : a + n), g++;
                          return !0 === o.toRegex
                            ? d(f, null, { wrap: !1, options: o })
                            : f;
                        })(e, t, Math.max(Math.abs(n), 1), r)
                    : null == n || a(n)
                    ? A(e, t, 1, n)
                    : ((e, t) => {
                        if (!0 === t.strictRanges)
                          throw new TypeError(
                            `Expected step "${e}" to be a number`
                          );
                        return [];
                      })(n, r)
                );
              };
            e.exports = A;
          },
          761: (e) => {
            /*!
             * is-number <https://github.com/jonschlinkert/is-number>
             *
             * Copyright (c) 2014-present, Jon Schlinkert.
             * Released under the MIT License.
             */
            e.exports = function (e) {
              return "number" == typeof e
                ? e - e == 0
                : "string" == typeof e &&
                    "" !== e.trim() &&
                    (Number.isFinite ? Number.isFinite(+e) : isFinite(+e));
            };
          },
          401: (e, t, n) => {
            const o = n(669),
              r = n(235),
              a = n(722),
              s = n(598),
              i = (e) => "string" == typeof e && ("" === e || "./" === e),
              l = (e, t, n) => {
                (t = [].concat(t)), (e = [].concat(e));
                let o = new Set(),
                  r = new Set(),
                  s = new Set(),
                  i = 0,
                  l = (e) => {
                    s.add(e.output), n && n.onResult && n.onResult(e);
                  };
                for (let s = 0; s < t.length; s++) {
                  let u = a(String(t[s]), { ...n, onResult: l }, !0),
                    p = u.state.negated || u.state.negatedExtglob;
                  p && i++;
                  for (let t of e) {
                    let e = u(t, !0);
                    (p ? !e.isMatch : e.isMatch) &&
                      (p
                        ? o.add(e.output)
                        : (o.delete(e.output), r.add(e.output)));
                  }
                }
                let u = (i === t.length ? [...s] : [...r]).filter(
                  (e) => !o.has(e)
                );
                if (n && 0 === u.length) {
                  if (!0 === n.failglob)
                    throw new Error(`No matches found for "${t.join(", ")}"`);
                  if (!0 === n.nonull || !0 === n.nullglob)
                    return n.unescape ? t.map((e) => e.replace(/\\/g, "")) : t;
                }
                return u;
              };
            (l.match = l),
              (l.matcher = (e, t) => a(e, t)),
              (l.any = l.isMatch = (e, t, n) => a(t, n)(e)),
              (l.not = (e, t, n = {}) => {
                t = [].concat(t).map(String);
                let o = new Set(),
                  r = [],
                  a = l(e, t, {
                    ...n,
                    onResult: (e) => {
                      n.onResult && n.onResult(e), r.push(e.output);
                    },
                  });
                for (let e of r) a.includes(e) || o.add(e);
                return [...o];
              }),
              (l.contains = (e, t, n) => {
                if ("string" != typeof e)
                  throw new TypeError(`Expected a string: "${o.inspect(e)}"`);
                if (Array.isArray(t)) return t.some((t) => l.contains(e, t, n));
                if ("string" == typeof t) {
                  if (i(e) || i(t)) return !1;
                  if (
                    e.includes(t) ||
                    (e.startsWith("./") && e.slice(2).includes(t))
                  )
                    return !0;
                }
                return l.isMatch(e, t, { ...n, contains: !0 });
              }),
              (l.matchKeys = (e, t, n) => {
                if (!s.isObject(e))
                  throw new TypeError(
                    "Expected the first argument to be an object"
                  );
                let o = l(Object.keys(e), t, n),
                  r = {};
                for (let t of o) r[t] = e[t];
                return r;
              }),
              (l.some = (e, t, n) => {
                let o = [].concat(e);
                for (let e of [].concat(t)) {
                  let t = a(String(e), n);
                  if (o.some((e) => t(e))) return !0;
                }
                return !1;
              }),
              (l.every = (e, t, n) => {
                let o = [].concat(e);
                for (let e of [].concat(t)) {
                  let t = a(String(e), n);
                  if (!o.every((e) => t(e))) return !1;
                }
                return !0;
              }),
              (l.all = (e, t, n) => {
                if ("string" != typeof e)
                  throw new TypeError(`Expected a string: "${o.inspect(e)}"`);
                return [].concat(t).every((t) => a(t, n)(e));
              }),
              (l.capture = (e, t, n) => {
                let o = s.isWindows(n),
                  r = a
                    .makeRe(String(e), { ...n, capture: !0 })
                    .exec(o ? s.toPosixSlashes(t) : t);
                if (r) return r.slice(1).map((e) => (void 0 === e ? "" : e));
              }),
              (l.makeRe = (...e) => a.makeRe(...e)),
              (l.scan = (...e) => a.scan(...e)),
              (l.parse = (e, t) => {
                let n = [];
                for (let o of [].concat(e || []))
                  for (let e of r(String(o), t)) n.push(a.parse(e, t));
                return n;
              }),
              (l.braces = (e, t) => {
                if ("string" != typeof e)
                  throw new TypeError("Expected a string");
                return (t && !0 === t.nobrace) || !/\{.*\}/.test(e)
                  ? [e]
                  : r(e, t);
              }),
              (l.braceExpand = (e, t) => {
                if ("string" != typeof e)
                  throw new TypeError("Expected a string");
                return l.braces(e, { ...t, expand: !0 });
              }),
              (e.exports = l);
          },
          578: (e, t, n) => {
            const o = n(550),
              r = (e) => {
                if (e < 1)
                  throw new TypeError(
                    "Expected `concurrency` to be a number from 1 and up"
                  );
                const t = [];
                let n = 0;
                const r = () => {
                    n--, t.length > 0 && t.shift()();
                  },
                  a = (e, t, ...a) => {
                    n++;
                    const s = o(e, ...a);
                    t(s), s.then(r, r);
                  },
                  s = (o, ...r) =>
                    new Promise((s) =>
                      ((o, r, ...s) => {
                        n < e
                          ? a(o, r, ...s)
                          : t.push(a.bind(null, o, r, ...s));
                      })(o, s, ...r)
                    );
                return (
                  Object.defineProperties(s, {
                    activeCount: { get: () => n },
                    pendingCount: { get: () => t.length },
                  }),
                  s
                );
              };
            (e.exports = r), (e.exports.default = r);
          },
          550: (e) => {
            e.exports = (e, ...t) =>
              new Promise((n) => {
                n(e(...t));
              });
          },
          722: (e, t, n) => {
            e.exports = n(828);
          },
          86: (e, t, n) => {
            const o = n(622),
              r = {
                DOT_LITERAL: "\\.",
                PLUS_LITERAL: "\\+",
                QMARK_LITERAL: "\\?",
                SLASH_LITERAL: "\\/",
                ONE_CHAR: "(?=.)",
                QMARK: "[^/]",
                END_ANCHOR: "(?:\\/|$)",
                DOTS_SLASH: "\\.{1,2}(?:\\/|$)",
                NO_DOT: "(?!\\.)",
                NO_DOTS: "(?!(?:^|\\/)\\.{1,2}(?:\\/|$))",
                NO_DOT_SLASH: "(?!\\.{0,1}(?:\\/|$))",
                NO_DOTS_SLASH: "(?!\\.{1,2}(?:\\/|$))",
                QMARK_NO_DOT: "[^.\\/]",
                STAR: "[^/]*?",
                START_ANCHOR: "(?:^|\\/)",
              },
              a = {
                ...r,
                SLASH_LITERAL: "[\\\\/]",
                QMARK: "[^\\\\/]",
                STAR: "[^\\\\/]*?",
                DOTS_SLASH: "\\.{1,2}(?:[\\\\/]|$)",
                NO_DOT: "(?!\\.)",
                NO_DOTS: "(?!(?:^|[\\\\/])\\.{1,2}(?:[\\\\/]|$))",
                NO_DOT_SLASH: "(?!\\.{0,1}(?:[\\\\/]|$))",
                NO_DOTS_SLASH: "(?!\\.{1,2}(?:[\\\\/]|$))",
                QMARK_NO_DOT: "[^.\\\\/]",
                START_ANCHOR: "(?:^|[\\\\/])",
                END_ANCHOR: "(?:[\\\\/]|$)",
              };
            e.exports = {
              MAX_LENGTH: 65536,
              POSIX_REGEX_SOURCE: {
                alnum: "a-zA-Z0-9",
                alpha: "a-zA-Z",
                ascii: "\\x00-\\x7F",
                blank: " \\t",
                cntrl: "\\x00-\\x1F\\x7F",
                digit: "0-9",
                graph: "\\x21-\\x7E",
                lower: "a-z",
                print: "\\x20-\\x7E ",
                punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
                space: " \\t\\r\\n\\v\\f",
                upper: "A-Z",
                word: "A-Za-z0-9_",
                xdigit: "A-Fa-f0-9",
              },
              REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
              REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
              REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
              REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
              REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
              REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
              REPLACEMENTS: { "***": "*", "**/**": "**", "**/**/**": "**" },
              CHAR_0: 48,
              CHAR_9: 57,
              CHAR_UPPERCASE_A: 65,
              CHAR_LOWERCASE_A: 97,
              CHAR_UPPERCASE_Z: 90,
              CHAR_LOWERCASE_Z: 122,
              CHAR_LEFT_PARENTHESES: 40,
              CHAR_RIGHT_PARENTHESES: 41,
              CHAR_ASTERISK: 42,
              CHAR_AMPERSAND: 38,
              CHAR_AT: 64,
              CHAR_BACKWARD_SLASH: 92,
              CHAR_CARRIAGE_RETURN: 13,
              CHAR_CIRCUMFLEX_ACCENT: 94,
              CHAR_COLON: 58,
              CHAR_COMMA: 44,
              CHAR_DOT: 46,
              CHAR_DOUBLE_QUOTE: 34,
              CHAR_EQUAL: 61,
              CHAR_EXCLAMATION_MARK: 33,
              CHAR_FORM_FEED: 12,
              CHAR_FORWARD_SLASH: 47,
              CHAR_GRAVE_ACCENT: 96,
              CHAR_HASH: 35,
              CHAR_HYPHEN_MINUS: 45,
              CHAR_LEFT_ANGLE_BRACKET: 60,
              CHAR_LEFT_CURLY_BRACE: 123,
              CHAR_LEFT_SQUARE_BRACKET: 91,
              CHAR_LINE_FEED: 10,
              CHAR_NO_BREAK_SPACE: 160,
              CHAR_PERCENT: 37,
              CHAR_PLUS: 43,
              CHAR_QUESTION_MARK: 63,
              CHAR_RIGHT_ANGLE_BRACKET: 62,
              CHAR_RIGHT_CURLY_BRACE: 125,
              CHAR_RIGHT_SQUARE_BRACKET: 93,
              CHAR_SEMICOLON: 59,
              CHAR_SINGLE_QUOTE: 39,
              CHAR_SPACE: 32,
              CHAR_TAB: 9,
              CHAR_UNDERSCORE: 95,
              CHAR_VERTICAL_LINE: 124,
              CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
              SEP: o.sep,
              extglobChars: (e) => ({
                "!": {
                  type: "negate",
                  open: "(?:(?!(?:",
                  close: `))${e.STAR})`,
                },
                "?": { type: "qmark", open: "(?:", close: ")?" },
                "+": { type: "plus", open: "(?:", close: ")+" },
                "*": { type: "star", open: "(?:", close: ")*" },
                "@": { type: "at", open: "(?:", close: ")" },
              }),
              globChars: (e) => (!0 === e ? a : r),
            };
          },
          974: (e, t, n) => {
            const o = n(86),
              r = n(598),
              {
                MAX_LENGTH: a,
                POSIX_REGEX_SOURCE: s,
                REGEX_NON_SPECIAL_CHARS: i,
                REGEX_SPECIAL_CHARS_BACKREF: l,
                REPLACEMENTS: u,
              } = o,
              p = (e, t) => {
                if ("function" == typeof t.expandRange)
                  return t.expandRange(...e, t);
                e.sort();
                const n = `[${e.join("-")}]`;
                try {
                  new RegExp(n);
                } catch (t) {
                  return e.map((e) => r.escapeRegex(e)).join("..");
                }
                return n;
              },
              c = (e, t) =>
                `Missing ${e}: "${t}" - use "\\\\${t}" to match literal characters`,
              d = (e, t) => {
                if ("string" != typeof e)
                  throw new TypeError("Expected a string");
                e = u[e] || e;
                const n = { ...t },
                  d =
                    "number" == typeof n.maxLength
                      ? Math.min(a, n.maxLength)
                      : a;
                let f = e.length;
                if (f > d)
                  throw new SyntaxError(
                    `Input length: ${f}, exceeds maximum allowed length: ${d}`
                  );
                const h = { type: "bos", value: "", output: n.prepend || "" },
                  g = [h],
                  A = n.capture ? "" : "?:",
                  y = r.isWindows(t),
                  R = o.globChars(y),
                  m = o.extglobChars(R),
                  {
                    DOT_LITERAL: _,
                    PLUS_LITERAL: E,
                    SLASH_LITERAL: C,
                    ONE_CHAR: b,
                    DOTS_SLASH: v,
                    NO_DOT: x,
                    NO_DOT_SLASH: w,
                    NO_DOTS_SLASH: S,
                    QMARK: H,
                    QMARK_NO_DOT: T,
                    STAR: k,
                    START_ANCHOR: L,
                  } = R,
                  O = (e) => `(${A}(?:(?!${L}${e.dot ? v : _}).)*?)`,
                  $ = n.dot ? "" : x,
                  N = n.dot ? H : T;
                let I = !0 === n.bash ? O(n) : k;
                n.capture && (I = `(${I})`),
                  "boolean" == typeof n.noext && (n.noextglob = n.noext);
                const B = {
                  input: e,
                  index: -1,
                  start: 0,
                  dot: !0 === n.dot,
                  consumed: "",
                  output: "",
                  prefix: "",
                  backtrack: !1,
                  negated: !1,
                  brackets: 0,
                  braces: 0,
                  parens: 0,
                  quotes: 0,
                  globstar: !1,
                  tokens: g,
                };
                (e = r.removePrefix(e, B)), (f = e.length);
                const M = [],
                  P = [],
                  D = [];
                let U,
                  G = h;
                const j = () => B.index === f - 1,
                  K = (B.peek = (t = 1) => e[B.index + t]),
                  F = (B.advance = () => e[++B.index]),
                  W = () => e.slice(B.index + 1),
                  Q = (e = "", t = 0) => {
                    (B.consumed += e), (B.index += t);
                  },
                  X = (e) => {
                    (B.output += null != e.output ? e.output : e.value),
                      Q(e.value);
                  },
                  q = () => {
                    let e = 1;
                    for (; "!" === K() && ("(" !== K(2) || "?" === K(3)); )
                      F(), B.start++, e++;
                    return e % 2 != 0 && ((B.negated = !0), B.start++, !0);
                  },
                  Z = (e) => {
                    B[e]++, D.push(e);
                  },
                  Y = (e) => {
                    B[e]--, D.pop();
                  },
                  z = (e) => {
                    if ("globstar" === G.type) {
                      const t =
                          B.braces > 0 &&
                          ("comma" === e.type || "brace" === e.type),
                        n =
                          !0 === e.extglob ||
                          (M.length &&
                            ("pipe" === e.type || "paren" === e.type));
                      "slash" === e.type ||
                        "paren" === e.type ||
                        t ||
                        n ||
                        ((B.output = B.output.slice(0, -G.output.length)),
                        (G.type = "star"),
                        (G.value = "*"),
                        (G.output = I),
                        (B.output += G.output));
                    }
                    if (
                      (M.length &&
                        "paren" !== e.type &&
                        !m[e.value] &&
                        (M[M.length - 1].inner += e.value),
                      (e.value || e.output) && X(e),
                      G && "text" === G.type && "text" === e.type)
                    )
                      return (
                        (G.value += e.value),
                        void (G.output = (G.output || "") + e.value)
                      );
                    (e.prev = G), g.push(e), (G = e);
                  },
                  V = (e, t) => {
                    const o = { ...m[t], conditions: 1, inner: "" };
                    (o.prev = G), (o.parens = B.parens), (o.output = B.output);
                    const r = (n.capture ? "(" : "") + o.open;
                    Z("parens"),
                      z({ type: e, value: t, output: B.output ? "" : b }),
                      z({ type: "paren", extglob: !0, value: F(), output: r }),
                      M.push(o);
                  },
                  J = (e) => {
                    let t = e.close + (n.capture ? ")" : "");
                    if ("negate" === e.type) {
                      let o = I;
                      e.inner &&
                        e.inner.length > 1 &&
                        e.inner.includes("/") &&
                        (o = O(n)),
                        (o !== I || j() || /^\)+$/.test(W())) &&
                          (t = e.close = ")$))" + o),
                        "bos" === e.prev.type && j() && (B.negatedExtglob = !0);
                    }
                    z({ type: "paren", extglob: !0, value: U, output: t }),
                      Y("parens");
                  };
                if (!1 !== n.fastpaths && !/(^[*!]|[/()[\]{}"])/.test(e)) {
                  let o = !1,
                    a = e.replace(l, (e, t, n, r, a, s) =>
                      "\\" === r
                        ? ((o = !0), e)
                        : "?" === r
                        ? t
                          ? t + r + (a ? H.repeat(a.length) : "")
                          : 0 === s
                          ? N + (a ? H.repeat(a.length) : "")
                          : H.repeat(n.length)
                        : "." === r
                        ? _.repeat(n.length)
                        : "*" === r
                        ? t
                          ? t + r + (a ? I : "")
                          : I
                        : t
                        ? e
                        : "\\" + e
                    );
                  return (
                    !0 === o &&
                      (a =
                        !0 === n.unescape
                          ? a.replace(/\\/g, "")
                          : a.replace(/\\+/g, (e) =>
                              e.length % 2 == 0 ? "\\\\" : e ? "\\" : ""
                            )),
                    a === e && !0 === n.contains
                      ? ((B.output = e), B)
                      : ((B.output = r.wrapOutput(a, B, t)), B)
                  );
                }
                for (; !j(); ) {
                  if (((U = F()), "\0" === U)) continue;
                  if ("\\" === U) {
                    const e = K();
                    if ("/" === e && !0 !== n.bash) continue;
                    if ("." === e || ";" === e) continue;
                    if (!e) {
                      (U += "\\"), z({ type: "text", value: U });
                      continue;
                    }
                    const t = /^\\+/.exec(W());
                    let o = 0;
                    if (
                      (t &&
                        t[0].length > 2 &&
                        ((o = t[0].length),
                        (B.index += o),
                        o % 2 != 0 && (U += "\\")),
                      !0 === n.unescape ? (U = F() || "") : (U += F() || ""),
                      0 === B.brackets)
                    ) {
                      z({ type: "text", value: U });
                      continue;
                    }
                  }
                  if (
                    B.brackets > 0 &&
                    ("]" !== U || "[" === G.value || "[^" === G.value)
                  ) {
                    if (!1 !== n.posix && ":" === U) {
                      const e = G.value.slice(1);
                      if (
                        e.includes("[") &&
                        ((G.posix = !0), e.includes(":"))
                      ) {
                        const e = G.value.lastIndexOf("["),
                          t = G.value.slice(0, e),
                          n = G.value.slice(e + 2),
                          o = s[n];
                        if (o) {
                          (G.value = t + o),
                            (B.backtrack = !0),
                            F(),
                            h.output || 1 !== g.indexOf(G) || (h.output = b);
                          continue;
                        }
                      }
                    }
                    (("[" === U && ":" !== K()) ||
                      ("-" === U && "]" === K())) &&
                      (U = "\\" + U),
                      "]" !== U ||
                        ("[" !== G.value && "[^" !== G.value) ||
                        (U = "\\" + U),
                      !0 === n.posix &&
                        "!" === U &&
                        "[" === G.value &&
                        (U = "^"),
                      (G.value += U),
                      X({ value: U });
                    continue;
                  }
                  if (1 === B.quotes && '"' !== U) {
                    (U = r.escapeRegex(U)), (G.value += U), X({ value: U });
                    continue;
                  }
                  if ('"' === U) {
                    (B.quotes = 1 === B.quotes ? 0 : 1),
                      !0 === n.keepQuotes && z({ type: "text", value: U });
                    continue;
                  }
                  if ("(" === U) {
                    Z("parens"), z({ type: "paren", value: U });
                    continue;
                  }
                  if (")" === U) {
                    if (0 === B.parens && !0 === n.strictBrackets)
                      throw new SyntaxError(c("opening", "("));
                    const e = M[M.length - 1];
                    if (e && B.parens === e.parens + 1) {
                      J(M.pop());
                      continue;
                    }
                    z({
                      type: "paren",
                      value: U,
                      output: B.parens ? ")" : "\\)",
                    }),
                      Y("parens");
                    continue;
                  }
                  if ("[" === U) {
                    if (!0 !== n.nobracket && W().includes("]")) Z("brackets");
                    else {
                      if (!0 !== n.nobracket && !0 === n.strictBrackets)
                        throw new SyntaxError(c("closing", "]"));
                      U = "\\" + U;
                    }
                    z({ type: "bracket", value: U });
                    continue;
                  }
                  if ("]" === U) {
                    if (
                      !0 === n.nobracket ||
                      (G && "bracket" === G.type && 1 === G.value.length)
                    ) {
                      z({ type: "text", value: U, output: "\\" + U });
                      continue;
                    }
                    if (0 === B.brackets) {
                      if (!0 === n.strictBrackets)
                        throw new SyntaxError(c("opening", "["));
                      z({ type: "text", value: U, output: "\\" + U });
                      continue;
                    }
                    Y("brackets");
                    const e = G.value.slice(1);
                    if (
                      (!0 === G.posix ||
                        "^" !== e[0] ||
                        e.includes("/") ||
                        (U = "/" + U),
                      (G.value += U),
                      X({ value: U }),
                      !1 === n.literalBrackets || r.hasRegexChars(e))
                    )
                      continue;
                    const t = r.escapeRegex(G.value);
                    if (
                      ((B.output = B.output.slice(0, -G.value.length)),
                      !0 === n.literalBrackets)
                    ) {
                      (B.output += t), (G.value = t);
                      continue;
                    }
                    (G.value = `(${A}${t}|${G.value})`), (B.output += G.value);
                    continue;
                  }
                  if ("{" === U && !0 !== n.nobrace) {
                    Z("braces");
                    const e = {
                      type: "brace",
                      value: U,
                      output: "(",
                      outputIndex: B.output.length,
                      tokensIndex: B.tokens.length,
                    };
                    P.push(e), z(e);
                    continue;
                  }
                  if ("}" === U) {
                    const e = P[P.length - 1];
                    if (!0 === n.nobrace || !e) {
                      z({ type: "text", value: U, output: U });
                      continue;
                    }
                    let t = ")";
                    if (!0 === e.dots) {
                      const e = g.slice(),
                        o = [];
                      for (
                        let t = e.length - 1;
                        t >= 0 && (g.pop(), "brace" !== e[t].type);
                        t--
                      )
                        "dots" !== e[t].type && o.unshift(e[t].value);
                      (t = p(o, n)), (B.backtrack = !0);
                    }
                    if (!0 !== e.comma && !0 !== e.dots) {
                      const n = B.output.slice(0, e.outputIndex),
                        o = B.tokens.slice(e.tokensIndex);
                      (e.value = e.output = "\\{"),
                        (U = t = "\\}"),
                        (B.output = n);
                      for (const e of o) B.output += e.output || e.value;
                    }
                    z({ type: "brace", value: U, output: t }),
                      Y("braces"),
                      P.pop();
                    continue;
                  }
                  if ("|" === U) {
                    M.length > 0 && M[M.length - 1].conditions++,
                      z({ type: "text", value: U });
                    continue;
                  }
                  if ("," === U) {
                    let e = U;
                    const t = P[P.length - 1];
                    t &&
                      "braces" === D[D.length - 1] &&
                      ((t.comma = !0), (e = "|")),
                      z({ type: "comma", value: U, output: e });
                    continue;
                  }
                  if ("/" === U) {
                    if ("dot" === G.type && B.index === B.start + 1) {
                      (B.start = B.index + 1),
                        (B.consumed = ""),
                        (B.output = ""),
                        g.pop(),
                        (G = h);
                      continue;
                    }
                    z({ type: "slash", value: U, output: C });
                    continue;
                  }
                  if ("." === U) {
                    if (B.braces > 0 && "dot" === G.type) {
                      "." === G.value && (G.output = _);
                      const e = P[P.length - 1];
                      (G.type = "dots"),
                        (G.output += U),
                        (G.value += U),
                        (e.dots = !0);
                      continue;
                    }
                    if (
                      B.braces + B.parens === 0 &&
                      "bos" !== G.type &&
                      "slash" !== G.type
                    ) {
                      z({ type: "text", value: U, output: _ });
                      continue;
                    }
                    z({ type: "dot", value: U, output: _ });
                    continue;
                  }
                  if ("?" === U) {
                    if (
                      !(G && "(" === G.value) &&
                      !0 !== n.noextglob &&
                      "(" === K() &&
                      "?" !== K(2)
                    ) {
                      V("qmark", U);
                      continue;
                    }
                    if (G && "paren" === G.type) {
                      const e = K();
                      let t = U;
                      if ("<" === e && !r.supportsLookbehinds())
                        throw new Error(
                          "Node.js v10 or higher is required for regex lookbehinds"
                        );
                      (("(" === G.value && !/[!=<:]/.test(e)) ||
                        ("<" === e && !/<([!=]|\w+>)/.test(W()))) &&
                        (t = "\\" + U),
                        z({ type: "text", value: U, output: t });
                      continue;
                    }
                    if (
                      !0 !== n.dot &&
                      ("slash" === G.type || "bos" === G.type)
                    ) {
                      z({ type: "qmark", value: U, output: T });
                      continue;
                    }
                    z({ type: "qmark", value: U, output: H });
                    continue;
                  }
                  if ("!" === U) {
                    if (
                      !0 !== n.noextglob &&
                      "(" === K() &&
                      ("?" !== K(2) || !/[!=<:]/.test(K(3)))
                    ) {
                      V("negate", U);
                      continue;
                    }
                    if (!0 !== n.nonegate && 0 === B.index) {
                      q();
                      continue;
                    }
                  }
                  if ("+" === U) {
                    if (!0 !== n.noextglob && "(" === K() && "?" !== K(2)) {
                      V("plus", U);
                      continue;
                    }
                    if ((G && "(" === G.value) || !1 === n.regex) {
                      z({ type: "plus", value: U, output: E });
                      continue;
                    }
                    if (
                      (G &&
                        ("bracket" === G.type ||
                          "paren" === G.type ||
                          "brace" === G.type)) ||
                      B.parens > 0
                    ) {
                      z({ type: "plus", value: U });
                      continue;
                    }
                    z({ type: "plus", value: E });
                    continue;
                  }
                  if ("@" === U) {
                    if (!0 !== n.noextglob && "(" === K() && "?" !== K(2)) {
                      z({ type: "at", extglob: !0, value: U, output: "" });
                      continue;
                    }
                    z({ type: "text", value: U });
                    continue;
                  }
                  if ("*" !== U) {
                    ("$" !== U && "^" !== U) || (U = "\\" + U);
                    const e = i.exec(W());
                    e && ((U += e[0]), (B.index += e[0].length)),
                      z({ type: "text", value: U });
                    continue;
                  }
                  if (G && ("globstar" === G.type || !0 === G.star)) {
                    (G.type = "star"),
                      (G.star = !0),
                      (G.value += U),
                      (G.output = I),
                      (B.backtrack = !0),
                      (B.globstar = !0),
                      Q(U);
                    continue;
                  }
                  let t = W();
                  if (!0 !== n.noextglob && /^\([^?]/.test(t)) {
                    V("star", U);
                    continue;
                  }
                  if ("star" === G.type) {
                    if (!0 === n.noglobstar) {
                      Q(U);
                      continue;
                    }
                    const o = G.prev,
                      r = o.prev,
                      a = "slash" === o.type || "bos" === o.type,
                      s = r && ("star" === r.type || "globstar" === r.type);
                    if (!0 === n.bash && (!a || (t[0] && "/" !== t[0]))) {
                      z({ type: "star", value: U, output: "" });
                      continue;
                    }
                    const i =
                        B.braces > 0 &&
                        ("comma" === o.type || "brace" === o.type),
                      l = M.length && ("pipe" === o.type || "paren" === o.type);
                    if (!a && "paren" !== o.type && !i && !l) {
                      z({ type: "star", value: U, output: "" });
                      continue;
                    }
                    for (; "/**" === t.slice(0, 3); ) {
                      const n = e[B.index + 4];
                      if (n && "/" !== n) break;
                      (t = t.slice(3)), Q("/**", 3);
                    }
                    if ("bos" === o.type && j()) {
                      (G.type = "globstar"),
                        (G.value += U),
                        (G.output = O(n)),
                        (B.output = G.output),
                        (B.globstar = !0),
                        Q(U);
                      continue;
                    }
                    if (
                      "slash" === o.type &&
                      "bos" !== o.prev.type &&
                      !s &&
                      j()
                    ) {
                      (B.output = B.output.slice(
                        0,
                        -(o.output + G.output).length
                      )),
                        (o.output = "(?:" + o.output),
                        (G.type = "globstar"),
                        (G.output = O(n) + (n.strictSlashes ? ")" : "|$)")),
                        (G.value += U),
                        (B.globstar = !0),
                        (B.output += o.output + G.output),
                        Q(U);
                      continue;
                    }
                    if (
                      "slash" === o.type &&
                      "bos" !== o.prev.type &&
                      "/" === t[0]
                    ) {
                      const e = void 0 !== t[1] ? "|$" : "";
                      (B.output = B.output.slice(
                        0,
                        -(o.output + G.output).length
                      )),
                        (o.output = "(?:" + o.output),
                        (G.type = "globstar"),
                        (G.output = `${O(n)}${C}|${C}${e})`),
                        (G.value += U),
                        (B.output += o.output + G.output),
                        (B.globstar = !0),
                        Q(U + F()),
                        z({ type: "slash", value: "/", output: "" });
                      continue;
                    }
                    if ("bos" === o.type && "/" === t[0]) {
                      (G.type = "globstar"),
                        (G.value += U),
                        (G.output = `(?:^|${C}|${O(n)}${C})`),
                        (B.output = G.output),
                        (B.globstar = !0),
                        Q(U + F()),
                        z({ type: "slash", value: "/", output: "" });
                      continue;
                    }
                    (B.output = B.output.slice(0, -G.output.length)),
                      (G.type = "globstar"),
                      (G.output = O(n)),
                      (G.value += U),
                      (B.output += G.output),
                      (B.globstar = !0),
                      Q(U);
                    continue;
                  }
                  const o = { type: "star", value: U, output: I };
                  !0 !== n.bash
                    ? !G ||
                      ("bracket" !== G.type && "paren" !== G.type) ||
                      !0 !== n.regex
                      ? ((B.index !== B.start &&
                          "slash" !== G.type &&
                          "dot" !== G.type) ||
                          ("dot" === G.type
                            ? ((B.output += w), (G.output += w))
                            : !0 === n.dot
                            ? ((B.output += S), (G.output += S))
                            : ((B.output += $), (G.output += $)),
                          "*" !== K() && ((B.output += b), (G.output += b))),
                        z(o))
                      : ((o.output = U), z(o))
                    : ((o.output = ".*?"),
                      ("bos" !== G.type && "slash" !== G.type) ||
                        (o.output = $ + o.output),
                      z(o));
                }
                for (; B.brackets > 0; ) {
                  if (!0 === n.strictBrackets)
                    throw new SyntaxError(c("closing", "]"));
                  (B.output = r.escapeLast(B.output, "[")), Y("brackets");
                }
                for (; B.parens > 0; ) {
                  if (!0 === n.strictBrackets)
                    throw new SyntaxError(c("closing", ")"));
                  (B.output = r.escapeLast(B.output, "(")), Y("parens");
                }
                for (; B.braces > 0; ) {
                  if (!0 === n.strictBrackets)
                    throw new SyntaxError(c("closing", "}"));
                  (B.output = r.escapeLast(B.output, "{")), Y("braces");
                }
                if (
                  (!0 === n.strictSlashes ||
                    ("star" !== G.type && "bracket" !== G.type) ||
                    z({ type: "maybe_slash", value: "", output: C + "?" }),
                  !0 === B.backtrack)
                ) {
                  B.output = "";
                  for (const e of B.tokens)
                    (B.output += null != e.output ? e.output : e.value),
                      e.suffix && (B.output += e.suffix);
                }
                return B;
              };
            (d.fastpaths = (e, t) => {
              const n = { ...t },
                s =
                  "number" == typeof n.maxLength ? Math.min(a, n.maxLength) : a,
                i = e.length;
              if (i > s)
                throw new SyntaxError(
                  `Input length: ${i}, exceeds maximum allowed length: ${s}`
                );
              e = u[e] || e;
              const l = r.isWindows(t),
                {
                  DOT_LITERAL: p,
                  SLASH_LITERAL: c,
                  ONE_CHAR: d,
                  DOTS_SLASH: f,
                  NO_DOT: h,
                  NO_DOTS: g,
                  NO_DOTS_SLASH: A,
                  STAR: y,
                  START_ANCHOR: R,
                } = o.globChars(l),
                m = n.dot ? g : h,
                _ = n.dot ? A : h,
                E = n.capture ? "" : "?:";
              let C = !0 === n.bash ? ".*?" : y;
              n.capture && (C = `(${C})`);
              const b = (e) =>
                  !0 === e.noglobstar
                    ? C
                    : `(${E}(?:(?!${R}${e.dot ? f : p}).)*?)`,
                v = (e) => {
                  switch (e) {
                    case "*":
                      return `${m}${d}${C}`;
                    case ".*":
                      return `${p}${d}${C}`;
                    case "*.*":
                      return `${m}${C}${p}${d}${C}`;
                    case "*/*":
                      return `${m}${C}${c}${d}${_}${C}`;
                    case "**":
                      return m + b(n);
                    case "**/*":
                      return `(?:${m}${b(n)}${c})?${_}${d}${C}`;
                    case "**/*.*":
                      return `(?:${m}${b(n)}${c})?${_}${C}${p}${d}${C}`;
                    case "**/.*":
                      return `(?:${m}${b(n)}${c})?${p}${d}${C}`;
                    default: {
                      const t = /^(.*?)\.(\w+)$/.exec(e);
                      if (!t) return;
                      const n = v(t[1]);
                      if (!n) return;
                      return n + p + t[2];
                    }
                  }
                },
                x = r.removePrefix(e, { negated: !1, prefix: "" });
              let w = v(x);
              return w && !0 !== n.strictSlashes && (w += c + "?"), w;
            }),
              (e.exports = d);
          },
          828: (e, t, n) => {
            const o = n(622),
              r = n(321),
              a = n(974),
              s = n(598),
              i = n(86),
              l = (e, t, n = !1) => {
                if (Array.isArray(e)) {
                  const o = e.map((e) => l(e, t, n));
                  return (e) => {
                    for (const t of o) {
                      const n = t(e);
                      if (n) return n;
                    }
                    return !1;
                  };
                }
                const o =
                  (r = e) &&
                  "object" == typeof r &&
                  !Array.isArray(r) &&
                  e.tokens &&
                  e.input;
                var r;
                if ("" === e || ("string" != typeof e && !o))
                  throw new TypeError(
                    "Expected pattern to be a non-empty string"
                  );
                const a = t || {},
                  i = s.isWindows(t),
                  u = o ? l.compileRe(e, t) : l.makeRe(e, t, !1, !0),
                  p = u.state;
                delete u.state;
                let c = () => !1;
                if (a.ignore) {
                  const e = {
                    ...t,
                    ignore: null,
                    onMatch: null,
                    onResult: null,
                  };
                  c = l(a.ignore, e, n);
                }
                const d = (n, o = !1) => {
                  const {
                      isMatch: r,
                      match: s,
                      output: d,
                    } = l.test(n, u, t, { glob: e, posix: i }),
                    f = {
                      glob: e,
                      state: p,
                      regex: u,
                      posix: i,
                      input: n,
                      output: d,
                      match: s,
                      isMatch: r,
                    };
                  return (
                    "function" == typeof a.onResult && a.onResult(f),
                    !1 === r
                      ? ((f.isMatch = !1), !!o && f)
                      : c(n)
                      ? ("function" == typeof a.onIgnore && a.onIgnore(f),
                        (f.isMatch = !1),
                        !!o && f)
                      : ("function" == typeof a.onMatch && a.onMatch(f),
                        !o || f)
                  );
                };
                return n && (d.state = p), d;
              };
            (l.test = (e, t, n, { glob: o, posix: r } = {}) => {
              if ("string" != typeof e)
                throw new TypeError("Expected input to be a string");
              if ("" === e) return { isMatch: !1, output: "" };
              const a = n || {},
                i = a.format || (r ? s.toPosixSlashes : null);
              let u = e === o,
                p = u && i ? i(e) : e;
              return (
                !1 === u && ((p = i ? i(e) : e), (u = p === o)),
                (!1 !== u && !0 !== a.capture) ||
                  (u =
                    !0 === a.matchBase || !0 === a.basename
                      ? l.matchBase(e, t, n, r)
                      : t.exec(p)),
                { isMatch: Boolean(u), match: u, output: p }
              );
            }),
              (l.matchBase = (e, t, n, r = s.isWindows(n)) =>
                (t instanceof RegExp ? t : l.makeRe(t, n)).test(o.basename(e))),
              (l.isMatch = (e, t, n) => l(t, n)(e)),
              (l.parse = (e, t) =>
                Array.isArray(e)
                  ? e.map((e) => l.parse(e, t))
                  : a(e, { ...t, fastpaths: !1 })),
              (l.scan = (e, t) => r(e, t)),
              (l.compileRe = (e, t, n = !1, o = !1) => {
                if (!0 === n) return e.output;
                const r = t || {},
                  a = r.contains ? "" : "^",
                  s = r.contains ? "" : "$";
                let i = `${a}(?:${e.output})${s}`;
                e && !0 === e.negated && (i = `^(?!${i}).*$`);
                const u = l.toRegex(i, t);
                return !0 === o && (u.state = e), u;
              }),
              (l.makeRe = (e, t, n = !1, o = !1) => {
                if (!e || "string" != typeof e)
                  throw new TypeError("Expected a non-empty string");
                const r = t || {};
                let s,
                  i = { negated: !1, fastpaths: !0 },
                  u = "";
                return (
                  e.startsWith("./") &&
                    ((e = e.slice(2)), (u = i.prefix = "./")),
                  !1 === r.fastpaths ||
                    ("." !== e[0] && "*" !== e[0]) ||
                    (s = a.fastpaths(e, t)),
                  void 0 === s
                    ? ((i = a(e, t)), (i.prefix = u + (i.prefix || "")))
                    : (i.output = s),
                  l.compileRe(i, t, n, o)
                );
              }),
              (l.toRegex = (e, t) => {
                try {
                  const n = t || {};
                  return new RegExp(e, n.flags || (n.nocase ? "i" : ""));
                } catch (e) {
                  if (t && !0 === t.debug) throw e;
                  return /$^/;
                }
              }),
              (l.constants = i),
              (e.exports = l);
          },
          321: (e, t, n) => {
            const o = n(598),
              {
                CHAR_ASTERISK: r,
                CHAR_AT: a,
                CHAR_BACKWARD_SLASH: s,
                CHAR_COMMA: i,
                CHAR_DOT: l,
                CHAR_EXCLAMATION_MARK: u,
                CHAR_FORWARD_SLASH: p,
                CHAR_LEFT_CURLY_BRACE: c,
                CHAR_LEFT_PARENTHESES: d,
                CHAR_LEFT_SQUARE_BRACKET: f,
                CHAR_PLUS: h,
                CHAR_QUESTION_MARK: g,
                CHAR_RIGHT_CURLY_BRACE: A,
                CHAR_RIGHT_PARENTHESES: y,
                CHAR_RIGHT_SQUARE_BRACKET: R,
              } = n(86),
              m = (e) => e === p || e === s,
              _ = (e) => {
                !0 !== e.isPrefix && (e.depth = e.isGlobstar ? 1 / 0 : 1);
              };
            e.exports = (e, t) => {
              const n = t || {},
                E = e.length - 1,
                C = !0 === n.parts || !0 === n.scanToEnd,
                b = [],
                v = [],
                x = [];
              let w,
                S,
                H = e,
                T = -1,
                k = 0,
                L = 0,
                O = !1,
                $ = !1,
                N = !1,
                I = !1,
                B = !1,
                M = !1,
                P = !1,
                D = !1,
                U = !1,
                G = 0,
                j = { value: "", depth: 0, isGlob: !1 };
              const K = () => T >= E,
                F = () => ((w = S), H.charCodeAt(++T));
              for (; T < E; ) {
                let e;
                if (((S = F()), S !== s)) {
                  if (!0 === M || S === c) {
                    for (G++; !0 !== K() && (S = F()); )
                      if (S !== s)
                        if (S !== c) {
                          if (!0 !== M && S === l && (S = F()) === l) {
                            if (
                              ((O = j.isBrace = !0),
                              (N = j.isGlob = !0),
                              (U = !0),
                              !0 === C)
                            )
                              continue;
                            break;
                          }
                          if (!0 !== M && S === i) {
                            if (
                              ((O = j.isBrace = !0),
                              (N = j.isGlob = !0),
                              (U = !0),
                              !0 === C)
                            )
                              continue;
                            break;
                          }
                          if (S === A && (G--, 0 === G)) {
                            (M = !1), (O = j.isBrace = !0), (U = !0);
                            break;
                          }
                        } else G++;
                      else (P = j.backslashes = !0), F();
                    if (!0 === C) continue;
                    break;
                  }
                  if (S !== p) {
                    if (!0 !== n.noext) {
                      if (
                        !0 ===
                          (S === h ||
                            S === a ||
                            S === r ||
                            S === g ||
                            S === u) &&
                        H.charCodeAt(T + 1) === d
                      ) {
                        if (
                          ((N = j.isGlob = !0),
                          (I = j.isExtglob = !0),
                          (U = !0),
                          !0 === C)
                        ) {
                          for (; !0 !== K() && (S = F()); )
                            if (S !== s) {
                              if (S === y) {
                                (N = j.isGlob = !0), (U = !0);
                                break;
                              }
                            } else (P = j.backslashes = !0), (S = F());
                          continue;
                        }
                        break;
                      }
                    }
                    if (S === r) {
                      if (
                        (w === r && (B = j.isGlobstar = !0),
                        (N = j.isGlob = !0),
                        (U = !0),
                        !0 === C)
                      )
                        continue;
                      break;
                    }
                    if (S === g) {
                      if (((N = j.isGlob = !0), (U = !0), !0 === C)) continue;
                      break;
                    }
                    if (S === f)
                      for (; !0 !== K() && (e = F()); )
                        if (e !== s) {
                          if (e === R) {
                            if (
                              (($ = j.isBracket = !0),
                              (N = j.isGlob = !0),
                              (U = !0),
                              !0 === C)
                            )
                              continue;
                            break;
                          }
                        } else (P = j.backslashes = !0), F();
                    if (!0 === n.nonegate || S !== u || T !== k) {
                      if (!0 !== n.noparen && S === d) {
                        if (((N = j.isGlob = !0), !0 === C)) {
                          for (; !0 !== K() && (S = F()); )
                            if (S !== d) {
                              if (S === y) {
                                U = !0;
                                break;
                              }
                            } else (P = j.backslashes = !0), (S = F());
                          continue;
                        }
                        break;
                      }
                      if (!0 === N) {
                        if (((U = !0), !0 === C)) continue;
                        break;
                      }
                    } else (D = j.negated = !0), k++;
                  } else {
                    if (
                      (b.push(T),
                      v.push(j),
                      (j = { value: "", depth: 0, isGlob: !1 }),
                      !0 === U)
                    )
                      continue;
                    if (w === l && T === k + 1) {
                      k += 2;
                      continue;
                    }
                    L = T + 1;
                  }
                } else (P = j.backslashes = !0), (S = F()), S === c && (M = !0);
              }
              !0 === n.noext && ((I = !1), (N = !1));
              let W = H,
                Q = "",
                X = "";
              k > 0 && ((Q = H.slice(0, k)), (H = H.slice(k)), (L -= k)),
                W && !0 === N && L > 0
                  ? ((W = H.slice(0, L)), (X = H.slice(L)))
                  : !0 === N
                  ? ((W = ""), (X = H))
                  : (W = H),
                W &&
                  "" !== W &&
                  "/" !== W &&
                  W !== H &&
                  m(W.charCodeAt(W.length - 1)) &&
                  (W = W.slice(0, -1)),
                !0 === n.unescape &&
                  (X && (X = o.removeBackslashes(X)),
                  W && !0 === P && (W = o.removeBackslashes(W)));
              const q = {
                prefix: Q,
                input: e,
                start: k,
                base: W,
                glob: X,
                isBrace: O,
                isBracket: $,
                isGlob: N,
                isExtglob: I,
                isGlobstar: B,
                negated: D,
              };
              if (
                (!0 === n.tokens &&
                  ((q.maxDepth = 0), m(S) || v.push(j), (q.tokens = v)),
                !0 === n.parts || !0 === n.tokens)
              ) {
                let t;
                for (let o = 0; o < b.length; o++) {
                  const r = t ? t + 1 : k,
                    a = b[o],
                    s = e.slice(r, a);
                  n.tokens &&
                    (0 === o && 0 !== k
                      ? ((v[o].isPrefix = !0), (v[o].value = Q))
                      : (v[o].value = s),
                    _(v[o]),
                    (q.maxDepth += v[o].depth)),
                    (0 === o && "" === s) || x.push(s),
                    (t = a);
                }
                if (t && t + 1 < e.length) {
                  const o = e.slice(t + 1);
                  x.push(o),
                    n.tokens &&
                      ((v[v.length - 1].value = o),
                      _(v[v.length - 1]),
                      (q.maxDepth += v[v.length - 1].depth));
                }
                (q.slashes = b), (q.parts = x);
              }
              return q;
            };
          },
          598: (e, t, n) => {
            const o = n(622),
              r = "win32" === process.platform,
              {
                REGEX_BACKSLASH: a,
                REGEX_REMOVE_BACKSLASH: s,
                REGEX_SPECIAL_CHARS: i,
                REGEX_SPECIAL_CHARS_GLOBAL: l,
              } = n(86);
            (t.isObject = (e) =>
              null !== e && "object" == typeof e && !Array.isArray(e)),
              (t.hasRegexChars = (e) => i.test(e)),
              (t.isRegexChar = (e) => 1 === e.length && t.hasRegexChars(e)),
              (t.escapeRegex = (e) => e.replace(l, "\\$1")),
              (t.toPosixSlashes = (e) => e.replace(a, "/")),
              (t.removeBackslashes = (e) =>
                e.replace(s, (e) => ("\\" === e ? "" : e))),
              (t.supportsLookbehinds = () => {
                const e = process.version.slice(1).split(".").map(Number);
                return (
                  (3 === e.length && e[0] >= 9) || (8 === e[0] && e[1] >= 10)
                );
              }),
              (t.isWindows = (e) =>
                e && "boolean" == typeof e.windows
                  ? e.windows
                  : !0 === r || "\\" === o.sep),
              (t.escapeLast = (e, n, o) => {
                const r = e.lastIndexOf(n, o);
                return -1 === r
                  ? e
                  : "\\" === e[r - 1]
                  ? t.escapeLast(e, n, r - 1)
                  : `${e.slice(0, r)}\\${e.slice(r)}`;
              }),
              (t.removePrefix = (e, t = {}) => {
                let n = e;
                return (
                  n.startsWith("./") && ((n = n.slice(2)), (t.prefix = "./")), n
                );
              }),
              (t.wrapOutput = (e, t = {}, n = {}) => {
                let o = `${n.contains ? "" : "^"}(?:${e})${
                  n.contains ? "" : "$"
                }`;
                return !0 === t.negated && (o = `(?:^(?!${o}).*$)`), o;
              });
          },
          615: (e, t, n) => {
            /*!
             * to-regex-range <https://github.com/micromatch/to-regex-range>
             *
             * Copyright (c) 2015-present, Jon Schlinkert.
             * Released under the MIT License.
             */
            const o = n(761),
              r = (e, t, n) => {
                if (!1 === o(e))
                  throw new TypeError(
                    "toRegexRange: expected the first argument to be a number"
                  );
                if (void 0 === t || e === t) return String(e);
                if (!1 === o(t))
                  throw new TypeError(
                    "toRegexRange: expected the second argument to be a number."
                  );
                let a = { relaxZeros: !0, ...n };
                "boolean" == typeof a.strictZeros &&
                  (a.relaxZeros = !1 === a.strictZeros);
                let l =
                  e +
                  ":" +
                  t +
                  "=" +
                  String(a.relaxZeros) +
                  String(a.shorthand) +
                  String(a.capture) +
                  String(a.wrap);
                if (r.cache.hasOwnProperty(l)) return r.cache[l].result;
                let u = Math.min(e, t),
                  p = Math.max(e, t);
                if (1 === Math.abs(u - p)) {
                  let n = e + "|" + t;
                  return a.capture ? `(${n})` : !1 === a.wrap ? n : `(?:${n})`;
                }
                let c = h(e) || h(t),
                  d = { min: e, max: t, a: u, b: p },
                  f = [],
                  g = [];
                if (
                  (c && ((d.isPadded = c), (d.maxLen = String(d.max).length)),
                  u < 0)
                ) {
                  (g = s(p < 0 ? Math.abs(p) : 1, Math.abs(u), d, a)),
                    (u = d.a = 0);
                }
                return (
                  p >= 0 && (f = s(u, p, d, a)),
                  (d.negatives = g),
                  (d.positives = f),
                  (d.result = (function (e, t, n) {
                    let o = i(e, t, "-", !1, n) || [],
                      r = i(t, e, "", !1, n) || [],
                      a = i(e, t, "-?", !0, n) || [];
                    return o.concat(a).concat(r).join("|");
                  })(g, f, a)),
                  !0 === a.capture
                    ? (d.result = `(${d.result})`)
                    : !1 !== a.wrap &&
                      f.length + g.length > 1 &&
                      (d.result = `(?:${d.result})`),
                  (r.cache[l] = d),
                  d.result
                );
              };
            function a(e, t, n) {
              if (e === t) return { pattern: e, count: [], digits: 0 };
              let o = (function (e, t) {
                  let n = [];
                  for (let o = 0; o < e.length; o++) n.push([e[o], t[o]]);
                  return n;
                })(e, t),
                r = o.length,
                a = "",
                s = 0;
              for (let e = 0; e < r; e++) {
                let [t, r] = o[e];
                t === r
                  ? (a += t)
                  : "0" !== t || "9" !== r
                  ? (a += f(t, r, n))
                  : s++;
              }
              return (
                s && (a += !0 === n.shorthand ? "\\d" : "[0-9]"),
                { pattern: a, count: [s], digits: r }
              );
            }
            function s(e, t, n, o) {
              let r,
                s = (function (e, t) {
                  let n = 1,
                    o = 1,
                    r = p(e, n),
                    a = new Set([t]);
                  for (; e <= r && r <= t; ) a.add(r), (n += 1), (r = p(e, n));
                  for (r = c(t + 1, o) - 1; e < r && r <= t; )
                    a.add(r), (o += 1), (r = c(t + 1, o) - 1);
                  return (a = [...a]), a.sort(l), a;
                })(e, t),
                i = [],
                u = e;
              for (let e = 0; e < s.length; e++) {
                let t = s[e],
                  l = a(String(u), String(t), o),
                  p = "";
                n.isPadded || !r || r.pattern !== l.pattern
                  ? (n.isPadded && (p = g(t, n, o)),
                    (l.string = p + l.pattern + d(l.count)),
                    i.push(l),
                    (u = t + 1),
                    (r = l))
                  : (r.count.length > 1 && r.count.pop(),
                    r.count.push(l.count[0]),
                    (r.string = r.pattern + d(r.count)),
                    (u = t + 1));
              }
              return i;
            }
            function i(e, t, n, o, r) {
              let a = [];
              for (let r of e) {
                let { string: e } = r;
                o || u(t, "string", e) || a.push(n + e),
                  o && u(t, "string", e) && a.push(n + e);
              }
              return a;
            }
            function l(e, t) {
              return e > t ? 1 : t > e ? -1 : 0;
            }
            function u(e, t, n) {
              return e.some((e) => e[t] === n);
            }
            function p(e, t) {
              return Number(String(e).slice(0, -t) + "9".repeat(t));
            }
            function c(e, t) {
              return e - (e % Math.pow(10, t));
            }
            function d(e) {
              let [t = 0, n = ""] = e;
              return n || t > 1 ? `{${t + (n ? "," + n : "")}}` : "";
            }
            function f(e, t, n) {
              return `[${e}${t - e == 1 ? "" : "-"}${t}]`;
            }
            function h(e) {
              return /^-?(0+)\d/.test(e);
            }
            function g(e, t, n) {
              if (!t.isPadded) return e;
              let o = Math.abs(t.maxLen - String(e).length),
                r = !1 !== n.relaxZeros;
              switch (o) {
                case 0:
                  return "";
                case 1:
                  return r ? "0?" : "0";
                case 2:
                  return r ? "0{0,2}" : "00";
                default:
                  return r ? `0{0,${o}}` : `0{${o}}`;
              }
            }
            (r.cache = {}),
              (r.clearCache = () => (r.cache = {})),
              (e.exports = r);
          },
          622: (e) => {
            e.exports = require("path");
          },
          669: (e) => {
            e.exports = require("util");
          },
        },
        t = {};
      function n(o) {
        if (t[o]) return t[o].exports;
        var r = (t[o] = { exports: {} });
        return e[o](r, r.exports, n), r.exports;
      }
      return (
        (n.n = (e) => {
          var t = e && e.__esModule ? () => e.default : () => e;
          return n.d(t, { a: t }), t;
        }),
        (n.d = (e, t) => {
          for (var o in t)
            n.o(t, o) &&
              !n.o(e, o) &&
              Object.defineProperty(e, o, { enumerable: !0, get: t[o] });
        }),
        (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
        (n.r = (e) => {
          "undefined" != typeof Symbol &&
            Symbol.toStringTag &&
            Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
            Object.defineProperty(e, "__esModule", { value: !0 });
        }),
        n(997)
      );
    })();
    return plugin;
  },
};
