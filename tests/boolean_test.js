'use strict';

const test = require('tape');
const kboptions = require('../index');
const argvFor = require('./argvFor');

test("multiple booleans flip the value", (t) => {
    t.plan(14);

    const parser = kboptions.parser({ options: { foo: {} } });

    function testArgs(args, truth) {
        const result = parser.parse(argvFor(args));
        t.deepEqual(result.options, { foo: truth });
    }

    testArgs([], false);
    testArgs(['-f'], true);
    testArgs(['-f', '-f'], false);
    testArgs(['-f', '-f', '-f'], true);
    testArgs(['-ff'], false);
    testArgs(['--foo'], true);
    testArgs(['-f', '--foo'], false);
    testArgs(['--foo', '-f'], false);
    testArgs(['--foo', '--foo'], false);
    testArgs(['--foo', '--foo', '--foo'], true);
    testArgs(['-fff'], true);
    testArgs(['-f', '--foo', '-f'], true);
    testArgs(['--foo', '-ff'], true);
    testArgs(['-ff', '--foo', '-ff'], true);

    t.end();
});

test("boolean with value attached causes error", (t) => {
    t.plan(1);

    const parser = kboptions.parser({ options: { foo: {} } });

    const result = parser.parse(argvFor(['--foo=anything']));

    t.ok(result.errors);
    t.end();
});
