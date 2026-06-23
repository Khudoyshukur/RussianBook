export default function GrammarPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Grammar Cheatsheet</h1>
          <p className="text-sm text-gray-500 mt-1">The 20% of Russian grammar that covers 80% of everyday speech</p>
        </div>

        <div className="space-y-6">

          {/* 1. Cases */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">1. Cases</h2>
            <p className="text-sm text-gray-500 mb-4">Russian nouns change their ending depending on their role in a sentence.</p>

            {/* When to use */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 w-32">Case</th>
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700">When to use</th>
                    <th className="text-left py-2 font-semibold text-gray-700">Example</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-2.5 pr-4 font-medium text-blue-700">Nominative</td>
                    <td className="py-2.5 pr-4 text-gray-600">Subject (who/what does the action)</td>
                    <td className="py-2.5 text-gray-800"><span className="font-medium">Студент</span> читает. — <em>The student reads.</em></td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-medium text-blue-700">Accusative</td>
                    <td className="py-2.5 pr-4 text-gray-600">Direct object (what is acted upon); motion into a place</td>
                    <td className="py-2.5 text-gray-800">Я вижу <span className="font-medium">книгу</span>. Иду в <span className="font-medium">офис</span>.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-medium text-blue-700">Genitive</td>
                    <td className="py-2.5 pr-4 text-gray-600">Possession; absence (нет); after numbers; after из/у/от/без</td>
                    <td className="py-2.5 text-gray-800">Книга <span className="font-medium">брата</span>. Нет <span className="font-medium">времени</span>.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-medium text-blue-700">Dative</td>
                    <td className="py-2.5 pr-4 text-gray-600">Indirect object (to/for whom); мне нравится, надо, можно</td>
                    <td className="py-2.5 text-gray-800">Дал <span className="font-medium">другу</span>. <span className="font-medium">Мне</span> нравится. — <em>I like it.</em></td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-medium text-blue-700">Instrumental</td>
                    <td className="py-2.5 pr-4 text-gray-600">By means of; together with (с); profession (быть + inst.)</td>
                    <td className="py-2.5 text-gray-800">Пишу <span className="font-medium">ручкой</span>. Он <span className="font-medium">программистом</span>. — <em>He is a programmer.</em></td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-medium text-blue-700">Prepositional</td>
                    <td className="py-2.5 pr-4 text-gray-600">Location (в/на); topic (о); only used after a preposition</td>
                    <td className="py-2.5 text-gray-800">Живу в <span className="font-medium">Москве</span>. Думаю о <span className="font-medium">работе</span>.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Endings by gender */}
            <p className="text-sm font-semibold text-gray-700 mb-1">Singular noun endings by gender</p>
            <p className="text-xs text-gray-500 mb-3">
              <strong>Masculine</strong> — ends in a consonant (стол, друг) or <strong>-й/-ь</strong> &nbsp;|&nbsp;
              <strong>Feminine</strong> — ends in <strong>-а/-я/-ь</strong> &nbsp;|&nbsp;
              <strong>Neuter</strong> — ends in <strong>-о/-е</strong>
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-2 px-2 font-semibold text-gray-700 w-28">Case</th>
                    <th className="text-left py-2 px-2 font-semibold text-blue-700">Masc. (стол)</th>
                    <th className="text-left py-2 px-2 font-semibold text-pink-600">Fem. (книга)</th>
                    <th className="text-left py-2 px-2 font-semibold text-green-700">Neut. (окно)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ['Nominative',    'стол',   'книга',  'окно'],
                    ['Genitive',      'стола',  'книги',  'окна'],
                    ['Dative',        'столу',  'книге',  'окну'],
                    ['Instrumental',  'столом', 'книгой', 'окном'],
                    ['Prepositional', 'столе',  'книге',  'окне'],
                  ].map(([cas, masc, fem, neut]) => (
                    <tr key={cas}>
                      <td className="py-2 px-2 font-medium text-blue-700 text-xs">{cas}</td>
                      <td className="py-2 px-2 text-gray-900 font-medium">{masc}</td>
                      <td className="py-2 px-2 text-gray-900 font-medium">{fem}</td>
                      <td className="py-2 px-2 text-gray-900 font-medium">{neut}</td>
                    </tr>
                  ))}
                  <tr>
                    <td className="py-2 px-2 font-medium text-blue-700 text-xs">Accusative</td>
                    <td className="py-2 px-2 font-medium text-gray-900 leading-tight">
                      <span className="block">стол <span className="text-gray-400 text-xs">(inanim.)</span></span>
                      <span className="block text-gray-500">студента <span className="text-gray-400 text-xs">(anim.)</span></span>
                    </td>
                    <td className="py-2 px-2 font-medium text-gray-900 leading-tight">
                      <span className="block">книгу <span className="text-gray-400 text-xs">(inanim.)</span></span>
                      <span className="block text-gray-500">женщину <span className="text-gray-400 text-xs">(anim. same)</span></span>
                    </td>
                    <td className="py-2 px-2 font-medium text-gray-900 leading-tight">
                      <span className="block">окно</span>
                      <span className="block text-gray-400 text-xs italic">rarely animate</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-xs text-blue-800">
              <strong>Animate accusative rule:</strong> For people and animals, accusative = genitive.
              Masculine: студент → студент<strong>а</strong>.
              Feminine: endings are always <strong>-у/-ю</strong> regardless — animate and inanimate look the same (книгу / женщину).
            </div>

            {/* Plural declension */}
            <p className="text-sm font-semibold text-gray-700 mt-6 mb-1">Plural declension across cases</p>
            <p className="text-xs text-gray-500 mb-3">
              Plurals use the <strong>same endings regardless of gender</strong>. First form the nominative plural stem, then apply these endings.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-2 px-2 font-semibold text-gray-700 w-28">Case</th>
                    <th className="text-left py-2 px-2 font-semibold text-gray-700 w-32">Ending</th>
                    <th className="text-left py-2 px-2 font-semibold text-blue-700">столы</th>
                    <th className="text-left py-2 px-2 font-semibold text-pink-600">книги</th>
                    <th className="text-left py-2 px-2 font-semibold text-green-700">окна</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ['Nominative',    '-ы / -и / -а', 'столы',   'книги',   'окна'],
                    ['Genitive',      '-ов / — / -ей', 'столов',  'книг',    'окон'],
                    ['Dative',        '-ам / -ям',     'столам',  'книгам',  'окнам'],
                    ['Instrumental',  '-ами / -ями',   'столами', 'книгами', 'окнами'],
                    ['Prepositional', '-ах / -ях',     'столах',  'книгах',  'окнах'],
                  ].map(([cas, ending, masc, fem, neut]) => (
                    <tr key={cas}>
                      <td className="py-2 px-2 font-medium text-blue-700 text-xs">{cas}</td>
                      <td className="py-2 px-2 text-gray-500 font-mono text-xs">{ending}</td>
                      <td className="py-2 px-2 font-medium text-gray-900">{masc}</td>
                      <td className="py-2 px-2 font-medium text-gray-900">{fem}</td>
                      <td className="py-2 px-2 font-medium text-gray-900">{neut}</td>
                    </tr>
                  ))}
                  <tr>
                    <td className="py-2 px-2 font-medium text-blue-700 text-xs">Accusative</td>
                    <td className="py-2 px-2 text-gray-500 font-mono text-xs leading-tight">
                      <span className="block">inanim. = Nom.</span>
                      <span className="block">anim. = Gen.</span>
                    </td>
                    <td className="py-2 px-2 font-medium text-gray-900 leading-tight">
                      <span className="block">столы</span>
                      <span className="block text-gray-500">студентов</span>
                    </td>
                    <td className="py-2 px-2 font-medium text-gray-900 leading-tight">
                      <span className="block">книги</span>
                      <span className="block text-gray-500">женщин</span>
                    </td>
                    <td className="py-2 px-2 font-medium text-gray-900 leading-tight">
                      <span className="block">окна</span>
                      <span className="block text-gray-400 text-xs italic">rarely animate</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Forming nominative plural */}
            <p className="text-sm font-semibold text-gray-700 mt-5 mb-1">Forming the nominative plural stem</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-2 px-2 font-semibold text-gray-700">Gender</th>
                    <th className="text-left py-2 px-2 font-semibold text-gray-700">Singular ends in</th>
                    <th className="text-left py-2 px-2 font-semibold text-gray-700">Plural ending</th>
                    <th className="text-left py-2 px-2 font-semibold text-gray-700">Example</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ['Masculine', 'consonant', '-ы / -и', 'стол → столы, нож → ножи'],
                    ['Masculine', '-й', '-и', 'трамвай → трамваи'],
                    ['Masculine', '-ь', '-и', 'словарь → словари'],
                    ['Feminine', '-а', '-ы / -и', 'женщина → женщины, книга → книги'],
                    ['Feminine', '-я', '-и', 'неделя → недели'],
                    ['Feminine', '-ь', '-и', 'дверь → двери'],
                    ['Neuter', '-о', '-а', 'окно → окна'],
                    ['Neuter', '-е', '-я', 'море → моря'],
                  ].map(([gender, ends, pl, ex], i) => (
                    <tr key={i}>
                      <td className="py-2 px-2 font-medium text-gray-700">{gender}</td>
                      <td className="py-2 px-2 text-gray-600 font-mono">{ends}</td>
                      <td className="py-2 px-2 font-bold text-blue-700">{pl}</td>
                      <td className="py-2 px-2 text-gray-800">{ex}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 space-y-1.5">
              <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-xs text-amber-800">
                <strong>Spelling rule:</strong> After г, к, х, ж, ш, щ, ч always write <strong>-и</strong>, never <strong>-ы</strong>. (книга → книги, not книгы)
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-xs text-amber-800">
                <strong>Irregular plurals</strong> must be memorised: человек → люди, ребёнок → дети, друг → друзья, брат → братья, дерево → деревья.
              </div>
            </div>
          </section>

          {/* 2. Personal Pronouns */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">2. Personal Pronouns</h2>
            <p className="text-sm text-gray-500 mb-4">Four most-used cases. Dative is essential for нравится, надо, можно, and giving things to people.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-3 font-semibold text-gray-700">English</th>
                    <th className="text-left py-2 pr-3 font-semibold text-gray-700">Nominative</th>
                    <th className="text-left py-2 pr-3 font-semibold text-gray-700">Accusative</th>
                    <th className="text-left py-2 pr-3 font-semibold text-gray-700">Genitive</th>
                    <th className="text-left py-2 font-semibold text-gray-700">Dative</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ['I / me',              'я',   'меня', 'меня', 'мне'],
                    ['you (informal)',       'ты',  'тебя', 'тебя', 'тебе'],
                    ['he / him',            'он',  'его',  'его',  'ему'],
                    ['she / her',           'она', 'её',   'её',   'ей'],
                    ['we / us',             'мы',  'нас',  'нас',  'нам'],
                    ['you (formal/plural)', 'вы',  'вас',  'вас',  'вам'],
                    ['they / them',         'они', 'их',   'их',   'им'],
                  ].map(([eng, nom, acc, gen, dat]) => (
                    <tr key={eng}>
                      <td className="py-2.5 pr-3 text-gray-600">{eng}</td>
                      <td className="py-2.5 pr-3 font-medium text-gray-900">{nom}</td>
                      <td className="py-2.5 pr-3 font-medium text-gray-900">{acc}</td>
                      <td className="py-2.5 pr-3 font-medium text-gray-900">{gen}</td>
                      <td className="py-2.5 font-medium text-gray-900">{dat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-xs text-blue-800">
              <strong>Dative in action:</strong> Мне нравится кофе. — <em>I like coffee.</em> &nbsp;|&nbsp; Тебе надо отдохнуть. — <em>You need to rest.</em> &nbsp;|&nbsp; Ему можно. — <em>He is allowed.</em>
            </div>
          </section>

          {/* 3. Present Tense */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">3. Present Tense</h2>
            <p className="text-sm text-gray-500 mb-3">Two conjugation patterns. Check the infinitive ending to know which to use: verbs ending in <strong>-ать/-ять/-еть</strong> are usually 1st conjugation; verbs ending in <strong>-ить/-еть</strong> (stress on stem) are usually 2nd.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">1st conjugation — читать <em>(to read)</em></p>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-1 pr-4 font-medium text-gray-500 w-20">Pronoun</th>
                      <th className="text-left py-1 font-medium text-gray-500">Form <span className="text-gray-400">(ending)</span></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      ['я',      'читаю',   '-ю'],
                      ['ты',     'читаешь', '-ешь'],
                      ['он/она', 'читает',  '-ет'],
                      ['мы',     'читаем',  '-ем'],
                      ['вы',     'читаете', '-ете'],
                      ['они',    'читают',  '-ют'],
                    ].map(([pro, form, end]) => (
                      <tr key={pro}>
                        <td className="py-1.5 pr-4 text-gray-500">{pro}</td>
                        <td className="py-1.5 font-medium text-gray-900">{form} <span className="text-blue-600 text-xs">{end}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">2nd conjugation — говорить <em>(to speak)</em></p>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-1 pr-4 font-medium text-gray-500 w-20">Pronoun</th>
                      <th className="text-left py-1 font-medium text-gray-500">Form <span className="text-gray-400">(ending)</span></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      ['я',      'говорю',   '-ю'],
                      ['ты',     'говоришь', '-ишь'],
                      ['он/она', 'говорит',  '-ит'],
                      ['мы',     'говорим',  '-им'],
                      ['вы',     'говорите', '-ите'],
                      ['они',    'говорят',  '-ят'],
                    ].map(([pro, form, end]) => (
                      <tr key={pro}>
                        <td className="py-1.5 pr-4 text-gray-500">{pro}</td>
                        <td className="py-1.5 font-medium text-gray-900">{form} <span className="text-blue-600 text-xs">{end}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-xs text-amber-800">
              <strong>Watch out:</strong> Many common verbs are irregular — быть (to be) has no present tense form in modern Russian; хотеть (to want) mixes both conjugations; идти/ехать (to go) have unique stems. These must be memorised individually.
            </div>
          </section>

          {/* 4. Past Tense */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">4. Past Tense</h2>
            <p className="text-sm text-gray-500 mb-4">Past tense agrees with the <strong>gender/number of the subject</strong>, not the person. Drop <strong>-ть</strong> from the infinitive and add the ending.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700">Subject</th>
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700">Ending</th>
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700">читать</th>
                    <th className="text-left py-2 font-semibold text-gray-700">говорить</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ['Masculine (он, я♂, ты♂)', '-л',  'читал',  'говорил'],
                    ['Feminine (она, я♀, ты♀)', '-ла', 'читала', 'говорила'],
                    ['Neuter (оно)',             '-ло', 'читало', 'говорило'],
                    ['Plural (они, мы, вы)',     '-ли', 'читали', 'говорили'],
                  ].map(([subj, end, ex1, ex2]) => (
                    <tr key={subj}>
                      <td className="py-2.5 pr-4 text-gray-600">{subj}</td>
                      <td className="py-2.5 pr-4 font-bold text-blue-700">{end}</td>
                      <td className="py-2.5 font-medium text-gray-900">{ex1}</td>
                      <td className="py-2.5 font-medium text-gray-900">{ex2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-xs text-amber-800">
              <strong>Consonant-stem verbs drop the -л in masculine:</strong> нести → нёс (not нёсл), мочь → мог, идти → шёл. The other forms keep it: шла, шло, шли.
            </div>
          </section>

          {/* 5. Aspects + Future */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">5. Verb Aspects & Future Tense</h2>
            <p className="text-sm text-gray-500 mb-4">Every Russian verb comes in a pair: imperfective (ongoing/repeated) and perfective (completed/one-time). The perfective is usually formed by adding a prefix.</p>

            <div className="overflow-x-auto mb-5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700">Aspect</th>
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700">Use for</th>
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700">Pair example 1</th>
                    <th className="text-left py-2 font-semibold text-gray-700">Pair example 2</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-2.5 pr-4 font-medium text-orange-700">Imperfective</td>
                    <td className="py-2.5 pr-4 text-gray-600">Ongoing, repeated, or habitual</td>
                    <td className="py-2.5 text-gray-800">писать <em>(to write)</em></td>
                    <td className="py-2.5 text-gray-800">читать <em>(to read)</em></td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-medium text-green-700">Perfective</td>
                    <td className="py-2.5 pr-4 text-gray-600">Completed, single event, result</td>
                    <td className="py-2.5 text-gray-800">написать <em>(to write and finish)</em></td>
                    <td className="py-2.5 text-gray-800">прочитать <em>(to read and finish)</em></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm font-semibold text-gray-700 mb-3">Future tense:</p>
            <div className="space-y-2 text-sm">
              <div className="flex gap-3 items-start">
                <span className="font-semibold text-orange-700 w-28 flex-shrink-0">Imperfective</span>
                <span className="text-gray-800"><strong>буду + infinitive</strong> — Я <strong>буду писать</strong> письмо. — <em>I will be writing a letter.</em></span>
              </div>
              <div className="flex gap-3 items-start">
                <span className="font-semibold text-green-700 w-28 flex-shrink-0">Perfective</span>
                <span className="text-gray-800"><strong>conjugate the perfective verb</strong> — Я <strong>напишу</strong> письмо. — <em>I will write (and finish) the letter.</em></span>
              </div>
            </div>

            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-xs text-amber-800">
              <strong>Key insight:</strong> Perfective verbs have no present tense — conjugating them in the present form automatically gives future meaning. Я пишу = I am writing (now). Я напишу = I will write (and finish it).
            </div>
          </section>

          {/* 6. Key Prepositions */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">6. Key Prepositions</h2>
            <p className="text-sm text-gray-500 mb-4">Each preposition locks the following noun into a specific case. Some prepositions take different cases depending on meaning (location vs. motion).</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 w-12">Prep.</th>
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 w-28">Case</th>
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700">Meaning</th>
                    <th className="text-left py-2 font-semibold text-gray-700">Example</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ['в',  'Prepositional', 'in / at (location)',     'Я в офисе. — I am at the office.'],
                    ['в',  'Accusative',    'into / to (motion)',     'Я иду в офис. — I am going to the office.'],
                    ['на', 'Prepositional', 'on / at (location)',     'Книга на столе. — The book is on the table.'],
                    ['на', 'Accusative',    'onto / to (motion)',     'Положи на стол. — Put it on the table.'],
                    ['из', 'Genitive',      'from / out of',          'Я из Москвы. — I am from Moscow.'],
                    ['с',  'Genitive',      'from / off a surface',   'Возьми с полки. — Take it off the shelf.'],
                    ['с',  'Instrumental',  'with / together with',   'Я с другом. — I am with a friend.'],
                    ['к',  'Dative',        'towards / to a person',  'Иди к врачу. — Go to the doctor.'],
                    ['от', 'Genitive',      'away from',              'Далеко от дома. — Far from home.'],
                    ['у',  'Genitive',      "at someone's / to have", 'У меня есть кот. — I have a cat.'],
                    ['о',  'Prepositional', 'about / regarding',      'Говорим о работе. — We talk about work.'],
                    ['по', 'Dative',        'along / by / per',       'Иди по улице. — Walk along the street.'],
                    ['без','Genitive',      'without',                'Без сахара. — Without sugar.'],
                    ['за', 'Instrumental',  'behind / after (place)', 'За домом. — Behind the house.'],
                    ['за', 'Accusative',    'for / in exchange for',  'Спасибо за помощь. — Thanks for the help.'],
                  ].map(([prep, cas, meaning, ex], i) => (
                    <tr key={i}>
                      <td className="py-2.5 pr-4 font-bold text-blue-700">{prep}</td>
                      <td className="py-2.5 pr-4 text-gray-500 text-xs">{cas}</td>
                      <td className="py-2.5 pr-4 text-gray-600">{meaning}</td>
                      <td className="py-2.5 text-gray-800">{ex}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
